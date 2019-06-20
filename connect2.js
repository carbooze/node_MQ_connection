    var mq = require('ibmmq');
    var MQC = mq.MQC; // Want to refer to this export directly for simplicity
  
    // The queue manager and queue to be used. These can be overridden on command line.
    var qMgr = "DWEAA00";
    var qName = "CMGWY.AIM.REPLY.DEV";
    var mqmd = new mq.MQMD(); // Defaults are fine.
    var pmo = new mq.MQPMO();
    var cd = new mq.MQCD();
    var cno = new mq.MQCNO();
  
    cd.ConnectionName = "va10dlvihs308.wellpoint.com(57084)";
    cd.ChannelName = "TO.DWEAA00.A";
    var csp = new mq.MQCSP();
  
    cno.ClientConn = cd;  
    cno.Options = MQC.MQCNO_CLIENT_BINDING; // use MQCNO_CLIENT_BINDING to connect as client
  
    function putMessage(hObj) {
    //  var msg = Buffer.from(JSON.stringify(coff));
    var msg = "testsdgfhsdgf"
    // Describe how the Put should behave

      pmo.Options = MQC.MQPMO_NO_SYNCPOINT |
                    MQC.MQPMO_NEW_MSG_ID |
                    MQC.MQPMO_NEW_CORREL_ID;
  
      mq.Put(hObj,mqmd,pmo,msg,function(err) {
        if (err) {
            console.log("test");
          console.log(formatErr(err));
        } else {
            console.log("test");
          console.log("MQPUT successful");
        }
      });
    }
    mq.Connx(qMgr, cno, function (err, hConn) {
      if (err) {
        console.log((err));
      } else {
        console.log("MQCONN to %s successful ", qMgr);
  
        // Define what we want to open, and how we want to open it.
        var od = new mq.MQOD();
        od.ObjectName = qName;
        od.ObjectType = MQC.MQOT_Q;
        var openOptions = MQC.Stat;
        console.log(mq.Lookup('MQIA', 3));
        
        mq.Open(hConn, od, openOptions, function (err, hObj) {
          if (err) {
            console.log(formatErr(err));
          } else {
            console.log("MQOPEN of %s successful", qName);
            console.log('ededd ' + mq.Lookup('MQIA', 3));
            getStatus(hConn,od);
           // putMessage(hObj);
          }
         // cleanup(hConn, hObj);
        });
      }
    });



    function getStatus(hObj,od) {
      //  var msg = Buffer.from(JSON.stringify(coff));
      var msg = "testsdgfhsdgf"
      // Describe how the Put should behave
  
        pmo.Options = MQC.MQPMO_NO_SYNCPOINT |
                      MQC.MQPMO_NEW_MSG_ID |
                      MQC.MQPMO_NEW_CORREL_ID;
    
        mq.Stat(hObj,od,function(err) {
          if (err) {
              console.log("test");
            console.log(formatErr(err));
          } else {
              console.log("test");
            console.log("MQPUT successful");
          }
        });
      }