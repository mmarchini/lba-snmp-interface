var GET_ALL = "/getAll";

setInterval(function(){
  $.get(
    GET_ALL, 
    function (data, textStatus) {
      // Running 
      if(!data["running"]) {
        $("#waiting").removeClass("hidden");
        $("#running").addClass("hidden");
        return;
      } else {
        $("#waiting").addClass("hidden");
        $("#running").removeClass("hidden");
      }
      
      // Isso pode dar problema :)
      if(data["paused"]){
        $("#pause").addClass("active");
      } else {
        $("#pause").removeClass("active");
      }

      // TODO nome do jogador

      // Vida
      var maxLife = data["maxLife"];
      var curLife = data["curLife"];
      var percentLife = 100*curLife/maxLife;
      console.log(percentLife, curLife, maxLife);
      $("#lifeBar").css("width", percentLife+"%");

      // Magic Points 
      var maxMP = data["maxMP"];
      var curMP = data["curMP"];
      var percentMP = 100*curMP/maxMP;
      console.log(percentMP, curMP, maxMP);
      $("#mpBar").css("width", percentMP+"%");

      // Cashes and Keys
      $("#cash").text(data["cash"]);
      $("#keys").text(data["keys"]);

      var leafTable = data["leafTable"];
      var newLeafTable = [];
      
      for(var i in leafTable){
        var newLeaf = $("<i class='fa'>");
        if(leafTable[i]){
            newLeaf.css("color", "green");
            newLeaf.addClass("fa-leaf");
        } else {
            newLeaf.css("color", "rgb(166, 133, 61)");
            newLeaf.addClass("fa-archive");
        }
        newLeaf.css("padding", "0px 5px");
        newLeafTable.push(newLeaf);
      }

      $("#leafTable").html(newLeafTable);


      var behaviours = $("#behaviours");
      $("button", behaviours).removeClass("active");
      $("button[idx='"+data["behaviourCurrent"]+"']").addClass("active");
    }
  );
}, 1000);

$("#running").on("click", "#pause", function(e){
    console.log("CLICK PAUSE");
    var btn = $(e.target).closest("button");
    if(btn.hasClass("disabled"))
        return;
    
    var value = btn.hasClass("active") && "0" || "1";

    $.get(
        "/setPaused",
        {paused:value}
    );
});

// $("#behaviours").on("click", "button", function(e){
//     console.log("CLICK");
//     var btn = $(e.target).closest("button");
//     if(btn.hasClass("disabled") || btn.hasClass("active"))
//         return;
// 
//     $.get(
//         "/setBehaviour",
//         {behaviour:btn.attr("idx")}
//     );
// });

