let admin = require('firebase-admin'),
    express = require("express"),
    dotenv = require('dotenv').config();
    app = express(),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    serviceAccount = {
        "type": "service_account",
        "project_id": "fir-2af38",
        "private_key_id": "f3388b847af43aa1d7104c06cb0d4b467880b33b",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZBEyUu3F2WUK9\nNLzSwPQjhtGiXC0NY3vzZfHi+SOoZSSFsjAamgom8sUul3j+AwTMh/PBF2euFl4p\nE24wACeHSPjUrfi9yGtOPEepi7oOFTSNYCvnerTezKhFwUlGzFJU7pxXncUVF2pZ\nYdvx/Po8T43NR53V0gVFl5nSaSPBS3haWcDhsnsbhQMwxEw/DWUFeugctBKVks2n\nkj8W30IsDbHjrz6um7ca3NLmTkR5ZMjj6K1mDiMlbzvaWkE6QBNMmnLxI7rpmPo0\ngk9r34pfcgH/hrEvwEFHb0sSQ6AubHRj5Ipu7wFl2ppIlOJHRwTaHP2soSy6R7lf\n/rZeNPJ3AgMBAAECggEAUla0vau+2XH1hfc3+1i1aLNS36DMgStxUICp/X2cn1w8\ntrNMWBOA7ZUn5k0XXX0EuZuNiwIX1u/qqvgR0wmD9erkakFVwqADwqvRXs1Ceuxl\nw4wtLEccz/njkI/M/x0v0cS0sfOM3rtDIQWln1NmGDLw8OWOx51HXceu16wHomMO\nOxdXCU5m3uWrIb3NvMS91dwmxSGh6bPi2sMpFZdE1XU/f6vZnelhbXWWOnE9p4SL\nfzWZnH+qV/RZawozoKmsSd3FfcYewozuqBJ9nqkyxCV/wIk1MS0cbZFsd4oaL0Lq\nHGYk1JxXuxhhqyA0guSYXnMt8fV5946bIHt4n4FUTQKBgQD+AcqsTURqalBobOrH\n5ghMfivIIkIZ3EnENd6IZ2izGzHjiuQ+qLGyk63lenWn3JAzqZ7n+DxHWj0hie8T\nKMF3KdYFCMac/IMGE+VAqz2Fdq/DxnrUX2ckZfO/OQPjfdMcQf/hJTJ/1aAFF/ce\nzDS7RrG/BV6sjmyX7P4a+1731QKBgQDauDUeMwfy1R7cQpTY0ha4b3xV9ZJDOmGZ\n4bx8oy1Va20i3h/9nx//gWxCoXmixD/YZGaEjTPQz/3LEQdaqLhvOMXofpEyHmdi\nA+NKcY5N48HzX//Vzx1beEKWMNNz+EJQQiLAGuqRvkTHE33tyJLzir6bisXyo+eU\nvxLxJZwTGwKBgQD6ZwvExjs+6OWxvEXLoNLnja5dkqA1XDwASNbDA6Zsgs+wsHiH\n6Mec8wcIZavdOouR0pKLveS2tpfzG0ZrTc9DSSPqPJeHpUsJT8297dItYy6swlrO\nR+qnMDaVeYCC4MSgY9P7wS7CZPdmbhS48Li/MlcBqCqH07PsJb7vHIWnrQKBgEZK\niRepgtZx07cp1rhP3GltuuHNSDI+4vsXZwIPVxRqr+pSxKk3qIruxyIqzvKWa4ZZ\nzfCviIWFMqU+VcS3EH7+Gex8MKGQz9zaLwPPttIlbkGPCqNmKqMo5Q1rp6lPkdBF\nUPG4NMaeBXCNPR1cJo4KevN2B+PQ9S4Csk25ro0dAoGBAIeV+9FhrzP16N1eWF+p\nEPlHccjUhprHsA2OPAubXfi7kLTZxrGjdV0aIdlR+8j/42YGzPcIzQi8EByApLSV\nLc2DLP/ktPjUxm0M5N4JRytrlfBS4aOw56SF9ywF0oo0z9D/jAnt4o6CVWjIE8Z5\n/s+tu6C3QEkK8FEHcSADZko0\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-1fqhg@fir-2af38.iam.gserviceaccount.com",
        "client_id": "107767221775655138461",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1fqhg%40fir-2af38.iam.gserviceaccount.com"
      },
    port = process.env.PORT || 8080;


app.use("/assets", express.static("assets"));
app.use(urlencodedParser);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-2af38.firebaseio.com',
    databaseAuthVariableOverride: null
  });

  let db = admin.database(),
      ref = db.ref("restricted_access/secret_document");

app.get("/", function (req, res) {
    // console.log(ref);
    ref.once("value", function(snapshot) {
        console.log(`THE SNAPSHOT ${snapshot.val()}`);
      });
});

app.listen(port, console.log(`app is online at ${port}`));