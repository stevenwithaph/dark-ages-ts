<script lang="ts">
  import Error from './components/Error.svelte';
  import Route from './components/router/Route.svelte';
  import Login from './routes/auth/Login.svelte';
</script>

<Route path='auth'>
  <Login />
</Route>

<Error />