#!/usr/bin/env node

var program = require("commander");
var express = require("express");
var snmp = require("snmp-native");
var _ = require("underscore");

program
  .version("0.1.0")
  .option("-p, --snmp-port <n>", 'Porta SNMP', parseInt)
  .option("-h, --snmp-host <n>", 'Host SNMP')
  .option("-c, --snmp-community [value]", 'Comunidade read-write SNMP')
  .option("-l, --listening-port [value]", 'Porta do servidor', parseInt)
  .parse(process.argv);

var snmpPort = program["snmp-port"] || 5555;
var snmpHost = program["snmp-host"] || 'localhost';
var snmpCommunity = program["snmp-community"] || 'simple';
var port = program["listening-port"] || 3000;

console.log("Porta SNMP:", snmpPort);
console.log("Host SNMP:", snmpHost);
console.log("Comunidade SNMP:", snmpCommunity);

var app = express();

var session = new snmp.Session({host:snmpHost, port: snmpPort, community:snmpCommunity});

// SNMP data updater begin

var mib={};
mib["running"] =          [1,3,6,1,4,1,12619,1,1];
mib["paused"] =           [1,3,6,1,4,1,12619,1,2];
mib["playerName"] =       [1,3,6,1,4,1,12619,1,3];
mib["maxLife"] =          [1,3,6,1,4,1,12619,2,1];
mib["curLife"] =          [1,3,6,1,4,1,12619,2,2];
mib["maxMP"] =            [1,3,6,1,4,1,12619,2,3];
mib["curMP"] =            [1,3,6,1,4,1,12619,2,4];
mib["keys"] =             [1,3,6,1,4,1,12619,2,5];
mib["cash"] =             [1,3,6,1,4,1,12619,2,6];
mib["leafTable"] =        [1,3,6,1,4,1,12619,2,7,1,2];
mib["behaviourCurrent"] = [1,3,6,1,4,1,12619,3,1];
mib["behaviourTable"] =   [1,3,6,1,4,1,12619,3,2,1,2];


var snmpData = {};
snmpData["running"] = false;
snmpData["paused"] = false;
snmpData["playerName"] = "";

snmpData["maxLife"] = 0;
snmpData["curLife"] = 0;
snmpData["maxMP"] = 0;
snmpData["curMP"] = 0;
snmpData["keys"] = 0;
snmpData["cash"] = 0;
snmpData["leafTable"] = [];

snmpData["behaviourCurrent"] = 0;
snmpData["behaviourTable"] = [];

function getNameByOID(oid) {
  var _oid = oid.slice(0, oid.length-1);

  var name = "";

  for(var m in mib) {
    if(_.isEqual(mib[m], _oid))
      name = m;
  }

  return name;
}

function updateData() {
  session.getSubtree({oid:[1,3,6,1,4,1,12619]}, function (error, varbinds){
      if(error){
        console.log("fail");
      } else {
        var tmpData = _.clone(snmpData); 
        tmpData["leafTable"] = [];
        tmpData["behaviourTable"] = [];
        varbinds.forEach(function (vb) {
          var name = getNameByOID(vb.oid);
          // console.log(name + ' = ' + vb.value + ' (' + vb.type + ')');
          if(name.indexOf("Table")!=-1){
            tmpData[name].push(vb.value);
          } else {
            tmpData[name] = vb.value;
          }
        });
        snmpData = tmpData;
      }
  });
}

setInterval(updateData, 1000);

function getAllData(req, res){
  res.json(snmpData);
}

function setBehaviour(req, res) {
  var behaviour = req.query.behaviour;
  console.log(req.query);
  var oid = _.clone(mib["behaviourCurrent"]);
  oid.push(0);
  session.set({oid:oid, value:behaviour, type: 66}, function (error, varbinds) {
    res.send();
  });
}

function setPaused (req, res) {
  var paused = req.query.paused;
  console.log("setPaused", paused);
  var oid = _.clone(mib["paused"]);
  oid.push(0);
  session.set({oid:oid, value:paused, type: 66}, function (error, varbinds) {
    res.send();
  });
}
// SNMP data updater end

app.use("/", express.static('static'));
app.use("/getAll", getAllData);
app.use("/setBehaviour", setBehaviour);
app.use("/setPaused", setPaused);

console.log("Escutando na porta:", port);
app.listen(port);
