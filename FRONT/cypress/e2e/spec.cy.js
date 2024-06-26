const credentials = {
  email: "test@test.com",
  username: "TEST",
  password: "test",
};

const operate = {
  url: "https://www.amazon.es/AmazonBasics-recargables-precargadas-cubierta-exterior/dp/B00CWNMXQW/ref=pd_day0_d_sccl_3_3/262-6203639-6586141?pd_rd_w=oBdd8&content-id=amzn1.sym.ba6ffc34-ede0-4f68-807d-781b785733b1&pf_rd_p=ba6ffc34-ede0-4f68-807d-781b785733b1&pf_rd_r=2TZQCA006C63P4ZB8X0T&pd_rd_wg=EQRAL&pd_rd_r=a4c25110-d319-4e2a-b3b5-5c2103f4caaa&pd_rd_i=B00CWNMXQW&psc=1",
  selector: ".a-offscreen",
  price: "8,38€",
};

let token;

const url = "http://localhost:5173/";

describe("Open", () => {
  it("Can visit the page", () => {
    cy.visit(url);
  });
});

describe("Register", () => {
  it("Cannot register a bad user", () => {
    cy.visit(url).contains("Register").click();
    cy.contains("Email").type("test@test");
    cy.contains("Username").type(credentials.username);
    cy.contains("Password").type(credentials.password);
    cy.get("button").contains("Register").click();
    cy.contains("Please introduce a valid email").should("be.visible");
  });
  it("Can register a user", () => {
    cy.visit(url).contains("Register").click();
    cy.contains("Email").type(credentials.email);
    cy.contains("Username").type(credentials.username);
    cy.contains("Password").type(credentials.password);
    cy.get("button").contains("Register").click();
  });
});

describe("Login", () => {
  it("Cannot login a user with wrong credentials", () => {
    cy.visit(url).contains("Login").click();
    cy.contains("Email").type("wrong@email.com");
    cy.contains("Password").type("wrong");
    cy.get("button").contains("Log In").click();
    cy.contains("No data in the DB").should("be.visible");
  });
  it("Can login a user", () => {
    cy.visit(url).contains("Login").click();
    cy.contains("Email").type(credentials.email);
    cy.contains("Password").type(credentials.password);
    cy.get("button").contains("Log In").click();

    cy.contains("OK").should("be.visible");
  });
  it("Can save the token locally", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:1234/api/login",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      headers: {
        "Content-Type": "application/json ",
        Accept: "*/*",
        Connection: "keep-alive",
      },
    }).then((res) => {
      console.log(res.body);
      token = res.body.token;
      window.localStorage.setItem("tokenUser", token);
    });
  });
});
describe("Error", () => {
  it("Cannot visit a page that not exists", () => {
    window.localStorage.setItem("tokenUser", token);
    cy.visit(`${url}/credent`);
    cy.contains("Error 404 -- Not Found").should("be.visible");
  });
});
describe("Operate", () => {
  it("Can operate a search", () => {
    window.localStorage.setItem("tokenUser", token);
    cy.visit(`${url}/ops`);

    cy.contains("URL").get("input:first").clear().type(operate.url);
    cy.contains("Selector")
      .get("input#selector")
      .clear()
      .type(operate.selector);
    cy.get("button").contains("Search").click();
    cy.wait(10000);
    cy.contains(operate.price).should("be.visible");
    cy.contains("Checking Frequency")
      .get("#select-frecuency")
      .select("2 hours");
    cy.get("button").contains("Save").click();
    cy.contains("OK").should("be.visible");
  });
});

describe("Data", () => {
  it("Can change the duration of the comprobations and eliminate ", () => {
    window.localStorage.setItem("tokenUser", token);
    cy.visit(url).contains("Data").click().wait(300);
    cy.get("select#selector").select(0);
    cy.contains(operate.price).should("be.visible");
    cy.get("select#change-duration").select(1);
    cy.get("select#select-frecuency")
      .select(0)
      .get("button")
      .contains("Save")
      .click();
    // cy.contains("OK").should("be.visible");
    cy.wait(5000);
    cy.get("select#selector").select(0);
    cy.contains("Now, it is checked every 1 hour").should("be.visible");
    cy.get("button#btn-del").click();

    cy.contains("Erased from the DB").should("be.visible");
  });
});

describe("Modify user credentials and delete user", () => {
  it("Can change the credentials of a user", () => {
    window.localStorage.setItem("tokenUser", token);
    cy.visit(url).contains("Profile").click();
    cy.contains("Username").type(credentials.username + "a");
    cy.get("button").contains("Change").click();
    cy.contains("OK").should("be.visible");
    cy.get("input#username").should(
      "have.attr",
      "placeholder",
      credentials.username + "a"
    );
  });
  it("Can eliminate the credentials of a user", () => {
    window.localStorage.setItem("tokenUser", token);
    cy.visit(url).contains("Profile").click();
    cy.get("button").contains("Eliminate Account").click();

    cy.contains("Erased from the DB").should("be.visible");
  });
});
