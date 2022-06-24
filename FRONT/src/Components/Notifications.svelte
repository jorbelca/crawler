<script>
  import notification from "../State/store.js"
</script>

<main>
  {#if $notification.notifications.length > 0}
    <div class="toast toast-success">
      {$notification.notifications}
    </div>
  {/if}

  {#if $notification.errors.length > 0}
    <br />
    <br />
    <div class="toast toast-error">
      <button class="btn btn-clear float-right" />{$notification.errors}
    </div>
  {/if}
</main>
