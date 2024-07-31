<script lang="ts">
  import LoginNotice from './LoginNotice.svelte';
  import LoginForm from './LoginForm.svelte';
  import CreateForm from './CreateForm.svelte';
  import Route from '../../components/router/Route.svelte';
</script>

<div class='w-full h-full flex items-center justify-center'>
  <Route path='notice'>
    <LoginNotice />
  </Route>
  <Route path='login'>
    <LoginForm />
  </Route>
  <Route path='create'>
    <CreateForm />
  </Route>
</div>