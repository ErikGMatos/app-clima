<script>
  import Cold from '../../../assets/cold.svg';
  import Hot from '../../../assets/hot.svg';
  export let data;
  export let dataWeek;
  export let reset;

  $: filteredItems = dataWeek?.filter(({ dt }) => {
    const date = new Date(dt * 1000);
    if (!date.getHours() && !date.getMilliseconds() && !date.getMinutes()) return true;
    return false;
  });

  const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
</script>

<section>
  <div class="wrapper">
    <div>
      <div class="details-city">
        {#if data.name && data.sys?.country}
          <h3>{data.name} - {data.sys.country}</h3>
        {/if}

        {#if data.main?.temp && data.weather[0]?.description}
          <h2>{data.main.temp.toFixed(0)}˚C {data.weather[0].description}</h2>
        {/if}

        <div class="content-details">
          <div class="content-details-city">
            {#if data.main?.temp_max && data.main?.temp_min}
              <p>
                <img src={Cold} alt="frio" />
                <span class="value">{data.main.temp_min.toFixed(0)}˚</span>
                <img src={Hot} alt="quente" />
                <span class="value">{data.main.temp_max.toFixed(0)}˚</span>
              </p>
            {/if}
            {#if data.wind?.speed}
              <p>Vento <span class="value">{((data.wind.speed * 360) / 100).toFixed(2)}km/h</span></p>
            {/if}
          </div>
          <div class="content-details-city">
            {#if data.main?.humidity && data.main?.feels_like}
              <p>Sensação <span class="value">{data.main.feels_like.toFixed(0)}˚C</span></p>
              <p>Humidade <span class="value">{data.main.humidity}%</span></p>
            {/if}
          </div>
        </div>
      </div>
      <hr />
      <div class="days-week">
        {#each filteredItems as item}
          <div>
            <h6>{days[new Date(item.dt * 1000).getDay()]}</h6>
            <span>{item.main.temp_min.toFixed(0)}˚ {item.main.temp_max.toFixed(0)}˚</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <span title="fechar" on:click={reset} class="close">X</span>
</section>

<style>
  section {
    position: relative;
  }

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  h2 {
    font-size: 30px;
    margin: 15px 0;
    text-transform: capitalize;
  }

  .wrapper {
    text-align: left;
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 4px 5px 0 rgb(60 75 100 / 14%), 0 1px 10px 0 rgb(60 75 100 / 12%), 0 2px 4px -1px rgb(60 75 100 / 20%);
    margin-bottom: 50px;
  }

  .details-city {
    padding: 0 40px;
  }

  .details-city .value {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-right: 20px;
  }

  .details-city .content-details {
    display: flex;
  }

  .value {
    font-weight: 500;
  }

  .content-details-city:last-child {
    margin-left: 20px;
  }

  .content-details-city {
    text-align: left;
  }

  .content-details-city p {
    color: #bbb4ab;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 10px;
  }

  hr {
    border: 1px solid #ff820666;
    margin-bottom: 10px;
  }

  .days-week {
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .days-week h6 {
    margin: 0;
    font-size: 16px;
    text-transform: capitalize;
  }

  .days-week span {
    color: #ff8206;
    font-size: 14px;
    margin-top: 8px;
    display: inline-block;
    font-weight: 700;
  }

  @media only screen and (max-width: 600px) {
    .wrapper {
      margin-bottom: 10px;
    }
  }
</style>
