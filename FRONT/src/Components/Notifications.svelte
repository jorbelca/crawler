<script>
  import { InlineNotification } from "carbon-components-svelte"

  import notification from "../State/store.js"
</script>

<main>
  {#if $notification.notifications.length > 0}
    <InlineNotification
      lowContrast
      kind="success"
      title="Success:"
      subtitle={$notification.notifications}
    />
  {/if}

  {#if $notification.errors.length > 0}
    <br />
    <br />
    <InlineNotification
      lowContrast
      kind="error"
      title="Error:"
      subtitle={$notification.errors}
    />
  {/if}
</main>
