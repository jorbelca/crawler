<script>
  import { notificationStore, errorStore } from "../State/store.js"
</script>

<main>
  {#if $notificationStore.length > 0}
    <div class="toast toast-success">
      <button
        on:click={() => notificationStore.removeNotifications()}
        class="btn btn-clear float-right"
      />
      {$notificationStore}
    </div>
  {/if}

  {#if $errorStore.length > 0}
    <div class="toast toast-error">
      <button
        on:click={() => errorStore.removeErrors()}
        class="btn btn-clear float-right"
      />{$errorStore}
    </div>
  {/if}
</main>
