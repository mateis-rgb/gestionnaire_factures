/**
 * Page d'acceuil => creation facture
 * Mes fichiers => lecture JSON du fichier qui contient les factures au format JSON
 * Paramètres => lecture JSON du fichier qui contient les paramètres au format JSON
 */

/**
 * 
 * @param {Object} facture 
 * @returns 
 */
function createHTML (facture) {

    var idFacture = facture.n_facture;
    var nom = facture.nom;
    var prenom = facture.prenom;

    var saison = facture.periode;
    var date = facture.dateLimite;
    var modePaiement = facture.modePaiement;

    var prestations = facture.activites

    var total = 0;

    prestations.forEach(item => {
        total += parseInt(item.tarif);
    });

    var html = document.createElement("html");
    html.lang = "fr";
    html.innerHTML = `<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture</title>
    <style>
        * {
            font-family: "Montserrat";
        }

        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left !important;
        }
        .text-right {
            text-align: right !important;
        }

        .ml-6 {
            margin-left: 6px;
        }
        .mb-6 {
            margin-bottom: 6px;
        }

        .col {
            columns: 2;
            position: relative;
        }

        .bold {
            font-weight: bold;
        }

        .center {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 65%;
            transform: translate(-50%, -50%);
        }

        .bg-black {
            background-color: black;
            color: white
        }


        main, header {
            margin-left: 9%;    
        }

        table {
            width: 90%;
        }

        .bg-gray {
            background: rgb(212, 212, 212);
            border: 0px;
        }

        table.tableau {
            border: 1px solid black;
            border-collapse: collapse;
        }
        table.tableau th {
            border: 1px solid black;
        }
        table.tableau td {
            border: 1px solid black;
        }

        table.tab {
            border: 1px solid black;
            border-collapse: collapse;
        }
        table.tab thead {
            border: 1px solid black;
        }
        table.tab tfoot {
            border: 1px solid black;
        }

        footer {
            font-size: smaller;
            opacity: .5;
        }

        main, .infos {
            font-size: 95%;
        }
    </style>
    </head>
    <body>
    <header>
        <div class="col">
            <img src="img/image001.png">
            <div class="center">
                <h1 class="bold">FACT${idFacture}</h1>
                <h3 class="regular">Ref Client : ${nom} ${prenom}</h3>
            </div>
        </div>

        <span class="bold infos">
            SASU La Fabrique Musicale Angevine <br>
            126 rue Létanduère 49 000 ANGERS <br>
            SIRET : 839732211 <br>
            NIC : 00017 <br>
            Tel : 09 81 08 50 71
        </span>
    </header> <br>

    <main class="text-center">
        <table class="mb-6 tableau">
            <thead class="bg-black">
                <tr>
                    <th>Période</th>
                    <th>Facture n°</th>
                    <th>Paiment avant le</th>
                    <th>Mode de paiement</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center">
                    <th>${saison}</td>
                    <td>${idFacture}</td>
                    <td>${date}</td>
                    <td>${modePaiement}</td>
                </tr>
            </tbody>
        </table>

        <table class="tab">
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Prestation</th>
                    <th>Tarif Ref</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="text-center">
                        Activités Musicales de <br>
                        ${nom} ${prenom} <br>
                        à la Fabrique Musicale <br>
                        Angevine <br>
                    </th>
                    <td id="prestations">
                    </td>
                    <td id="tarifs">
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="bg-black">
                    <th class="text-left">Total</th>
                    <td></td>
                    <th class="text-right">${total} € TTC</th>
                </tr>
            </tfoot>
        </table> <br> <br>

        <div id="banque">
            <span class="bold">
                Virement au compte :
            </span>
            <table>
                <tbody>
                    <th colspan="5" class="text-left bg-gray">Domiciliation banque : CCM NORD BERCE BELINOIS</th>
                    <tr>
                        <th class="text-left">IBAN</th>
                        <td></td>
                        <td>FR76  1548  9048  2000  0899  9040  178</td>
                        <td>BIC</td>
                        <td>CMCIFR2A</td>
                    </tr>
                    <tr class="bg-gray">
                        <th class="text-left">Banque</th>
                        <td>Guichet</td>
                        <td>Compte</td>
                        <td>Clé RIB</td>
                        <td>78</td>
                    </tr>
                    <tr>
                        <th class="text-left">15489</th>
                        <td>04820</td>
                        <td>00089990401</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main> <br>

    <footer class="text-center">
        SASU La Fabrique Musicale Angevine au Capital de 3000 € <br>
        SIRET 839732211 NAF 8552Z <br>
        TVA non applicable art.293 du CGI <br>
        126 rue Létanduère 49 000 ANGERS - Tel 09 81 08 50 71. E-mail : lafabmusicangevine@gmail.com <br>
    </footer>
    </body>`;

    prestations.forEach(item => {
        var $Prestation = html.querySelector("td#prestations");
        var $Tarif = html.querySelector("td#tarifs");
        
        var presta = document.createElement("div");
        var tarif = document.createElement("div");
        
        presta.innerText = `${item.presta}`;
        tarif.innerText = `${item.tarif} € TTC`;
        
        var br1 = document.createElement("br");
        $Prestation.appendChild(presta);
        $Prestation.appendChild(br1);
        
        var br2 = document.createElement("br");
        $Tarif.appendChild(tarif);
        $Tarif.appendChild(br2);
    });

    return html;
}