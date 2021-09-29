const analisysJSON = require("../../assets/analysis.json");

//Nao vi necessidade em utilizar o banco de dados para esta manipulacao por ser apenas
//1 arquivo JSON sem qualquer necessidade de relacionar tabelas
//Assim, decidi fazer a manipulacao diretamente do arquivo
const organizeAnalisysJSON = async () => {
  let data = {
    chart: [],
    table: [],
  };
  for (let i = 0; i < analisysJSON.length; i++) {
    let variableName = i + 1;
    let chartObject = {
      name: "",
      data: [],
    };
    let tableObject = {
      var: "",
      sample_time: 0,
      value: 0,
    };

    chartObject.name = `var_${variableName}`;
    chartObject.data.push(analisysJSON[i]);
    tableObject.var = `var_${variableName}`;
    tableObject.sample_time = analisysJSON[i][0];
    tableObject.value = analisysJSON[i][1];
    data.chart.push(chartObject);
    data.table.push(tableObject);
  }

  return data;
};

module.exports = { organizeAnalisysJSON: organizeAnalisysJSON };
