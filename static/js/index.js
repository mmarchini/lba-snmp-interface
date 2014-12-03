var GET_ALL = "/getAll";

var running = false;

setInterval(function(){
  $.get(
    GET_ALL, 
    function (data, textStatus) {
      // Running 
      if(!data["running"] && running) {
        $("#waiting").removeClass("hidden");
        $("#running").addClass("hidden");
        running=false;
      } else if(data["running"] && !running){
        $("#playerName").val(data["playerName"]);
        running=true;
        $("#waiting").addClass("hidden");
        $("#running").removeClass("hidden");
      }
      if(!running)
        return;
      
      // Isso pode dar problema :)
      if(data["paused"]){
        $("#pause").removeClass("btn-outline");
      } else {
        $("#pause").addClass("btn-outline");
      }

      // TODO nome do jogador

      // Vida
      var maxLife = data["maxLife"];
      var curLife = data["curLife"];
      var percentLife = 100*curLife/maxLife;
      $("#lifeBar").css("width", percentLife+"%");

      // Magic Points 
      var maxMP = data["maxMP"];
      var curMP = data["curMP"];
      var percentMP = 100*curMP/maxMP;
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

      var behaviourTable = data["behaviourTable"];
      for(var i in behaviourTable){
        var paragraph = $("p", $('button[idx="'+i+'"]'));
        paragraph.html(behaviourTable[i]);
      }

    }
  );
}, 1000);

$("#behaviours").on("click", "button", function(e){
    var btn = $(e.target).closest("button");
    if(btn.hasClass("disabled") || btn.hasClass("active"))
        return;

    $.get(
        "/setBehaviour",
        {behaviour:btn.attr("idx")}
    );
});

$("#playerNameContainer").on("click", "button", function(e){
    var playerName = $("input", $(e.target).closest("#playerNameContainer")).val();
    console.log($("input", e.target));
    console.log($("input", $(e.target)));
    console.log(playerName);

    $.get(
        "/setPlayerName",
        {playerName:playerName}
    );
});
