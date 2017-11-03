/* Group 07 */

$(document).ready(function() {
   document.getElementById("validate-yaml").addEventListener("click", function() {setTimeout(clone_chart, 100)});
})

function clone_chart()
{
   let chart = document.getElementById("jxgbox");
   if (chart !== null)
   {
      let previsualization = document.getElementById("previsualized-chart");

      previsualization.innerHTML = chart.innerHTML
   }
}
