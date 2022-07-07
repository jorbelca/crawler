<script>
  import notification from "../State/store.js"


  if ($notification.notifications.length > 0) {
    setInterval(() => $notification.removeNotifications(), 2500)
    clearInterval()
  }
  if ($notification.errors.length > 0) {
    setInterval(() => $notification.removeErrors(), 2500)
    clearInterval()
  }
</script>

<main>
  {#if $notification.notifications.length > 0}
    <div class="toast toast-success">
      <button
        on:click={$notification.removeNotifications()}
        class="btn btn-clear float-right"
      />
      {$notification.notifications}
    </div>
  {/if}

  {#if $notification.errors.length > 0}
    <div class="toast toast-error">
      <button
        on:click={$notification.removeErrors()}
        class="btn btn-clear float-right"
      />{$notification.errors}
    </div>
  {/if}
</main>
