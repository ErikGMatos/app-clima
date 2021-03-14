<script>
  export let dataCities = [];
  console.log('Capital', dataCities);
</script>

<section>
  <h2>Capitais</h2>
  <div class="wrapper">
    <ul class="xx">
      <li>
        <span class="min">Min</span><span class="max">Máx</span>
      </li>
      {#each dataCities as city, index}
        {#if index < 5}
          <li>
            <span>{city.main.temp_min.toFixed(0)}˚</span>
            <span>{city.main.temp_max.toFixed(0)}˚</span>
            <span>{city.name}</span>
          </li>
        {/if}
      {/each}
    </ul>
    <ul class="xx">
      <li class="hide">
        <span class="min">Min</span><span class="max">Máx</span>
      </li>
      {#each dataCities as city, index}
        {#if index > 4}
          <li>
            <span>{city.main.temp_min.toFixed(0)}˚</span>
            <span>{city.main.temp_max.toFixed(0)}˚</span>
            <span>{city.name}</span>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</section>

<style>
  section {
    padding: 0 30px;
    min-width: 433px;
  }

  h2 {
    color: #fafafa;
  }

  h2 {
    text-align: left;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .min,
  .max {
    font-size: 10px;
    color: #865b19;
    font-weight: 400;
  }

  ul {
    text-align: left;
    min-height: 189px;
  }

  ul li + li {
    margin-top: 15px;
  }

  ul li:first-child {
    text-align: left;
  }

  ul + ul {
    margin-left: 50px;
  }

  li span {
    font-size: 14px;
    font-weight: 700;
  }

  li span + span:not(:last-child) {
    margin-left: 10px;
  }

  li span + span:last-child {
    margin-left: 15px;
  }

  @media only screen and (max-width: 600px) {
    section {
      min-width: 100%;
    }
    .wrapper {
      flex-direction: column;
      align-items: flex-start;
    }

    ul + ul {
      margin-left: unset;
    }

    .hide {
      display: none;
    }
  }
</style>
