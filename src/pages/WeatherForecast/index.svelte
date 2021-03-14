<script>
  import Capitals from './Capitals';
  import CityDetails from './CityDetails';
  import api from '../../services/api.js';
  import { onMount } from 'svelte';
  let term = '';
  let data = {};
  let dataWeek = [];
  let dataCities = [];

  onMount(async () => {
    const [rj, sp, bh, be, sa, cu, fo, ma, jp, br] = await Promise.allSettled([
      api.get('/weather?q=rio de janeiro'),
      api.get('/weather?q=são paulo'),
      api.get('/weather?q=belo horizonte'),
      api.get('/weather?q=belém'),
      api.get('/weather?q=salvador'),
      api.get('/weather?q=curitiba'),
      api.get('/weather?q=fortaleza'),
      api.get('/weather?q=manaus'),
      api.get('/weather?q=joao pessoa'),
      api.get('/weather?q=brasilia'),
    ]);
    dataCities = [...dataCities, rj.value.data];
    dataCities = [...dataCities, sp.value.data];
    dataCities = [...dataCities, bh.value.data];
    dataCities = [...dataCities, be.value.data];
    dataCities = [...dataCities, sa.value.data];
    dataCities = [...dataCities, cu.value.data];
    dataCities = [...dataCities, fo.value.data];
    dataCities = [...dataCities, ma.value.data];
    dataCities = [...dataCities, jp.value.data];
    dataCities = [...dataCities, br.value.data];
  });

  async function handleSubmit() {
    try {
      const [response, responseWeek] = await Promise.allSettled([
        api.get(`/weather?q=${term}`),
        api.get(`/forecast?q=${term}`),
      ]);
      data = response.value.data;
      dataWeek = responseWeek.value.data.list;
    } catch (error) {
      alert('cidade não encontrada tente novamente');
      term = '';
    }
  }

  function reset() {
    data = {};
    dataWeek = [];
  }
</script>

<div class="container">
  <h1>Previsão do tempo</h1>
  {#if Object.keys(data).length && dataWeek.length}
    <CityDetails {data} {dataWeek} {reset} />
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={term} type="text" placeholder="Insira aqui o nome da cidade" />
    <button disabled={!term} type="submit">Buscar</button>
  </form>
  <hr />
  <Capitals {dataCities} />
</div>

<style>
  hr {
    border: 1px solid #fafafa;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  h1 {
    color: #fafafa;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 30px;
    margin-top: 0;
  }

  form {
    display: flex;
  }

  button {
    margin-left: 10px;
    background-color: #505050;
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
  }

  input {
    width: 100%;
    height: 42px;
    line-height: 42px;
    box-shadow: 0 4px 5px 0 rgb(60 75 100 / 14%), 0 1px 10px 0 rgb(60 75 100 / 12%), 0 2px 4px -1px rgb(60 75 100 / 20%);
  }

  @media only screen and (max-width: 600px) {
    hr {
      margin-top: 10px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 10px;
      margin-top: 0;
    }
    .container {
      width: 90%;
    }
  }
</style>
