let vm = new Vue({
    el: "#app",
    vuetify: new Vuetify({
        locale: {
            locale: "fr-fr",
        }
    }),
    data () {
        return {
            step: 1,
            switch1: false,
            bottom: false,
            user: {
                title: "La Fabrique",
                subtitle: "Musicale Angevine",
                picture: "img/image001.png"
            },
            nav: [
                { icon: "mdi-folder", title: "Mes Fichiers", link: "files.html"},
            ],
            nom_client: "",
            prenom_client: "",
            select_periode: null,
            periodes: [ "Saison 2022 - 2023", "Saison 2023 - 2024", "Saison 2024 - 2025", "Saison 2025 - 2026", "Saison 2026 - 2027", "Saison 2027 - 2028", "Saison 2028 - 2029", "Saison 2029 - 2030" ],
            n_facture: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            paiement: [ "Virement bancaire", "Chèque", "CB", "Autre"],
            select_paiement: null,
            activites: [
                { id: 0, presta: "Cours", tarif: 25 },
            ],
            pdfPath: "",
            nomFichier: "",
            message: null,
            alert: false,
            factures: [],
            search: "",
            headers: [
                { text: 'N° Facture', align: 'start', value: 'n_facture' },
                { text: 'Client', value: 'client' },
                { text: 'Date de création', value: 'dateCreation' },
                { text: 'Montant TTC', value: 'montantTotal' },
                { text: "", value: "action", sortable: false }
            ]
        }
    },
    methods: {
        /**
         * @param {String} type 
         * @param {String} content 
         */
        setMessage(type, content) {
            this.alert = !this.alert;
            this.message = {
                type: type,
                content: content,
            };

            setTimeout(() => (this.alert = false), 5000);
        },
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("theme", this.$vuetify.theme.dark.toString());
        },
        openSaveDialog() {
        },
        ajouterActivite() {
            this.activites.push({
                id: this.activites.length,
                presta: "Cours",
                tarif: 0
            });
        },
        /**
         * @param {Array} array
         * @param {Number} arrayID 
         */
        retirerElm(array, arrayID) {
            index = array.indexOf(array[arrayID]);

            array.splice(index, 1);
            // if (array.length == arrayID) {
            //     array.pop();
            // }
            // else {
            // }
        },
        genererJSON () {
            const prenom = this.prenom_client.toLowerCase();
            const premiereLettre = prenom.charAt(0);
            const premiereLettreMaj = premiereLettre.toUpperCase();
            const caracteresRestants = prenom.slice(1);
            const prenomMajuscule = String(premiereLettreMaj + caracteresRestants);

            var mTotal = 0

            if (this.n_facture && this.nom_client &&  this.prenom_client && this.select_periode && this.date && this.select_paiement && this.activites) {   
                this.activites.forEach(item => {
                    mTotal += parseInt(item.tarif);
                });
               
                let facture = {
                    nom: this.nom_client.toUpperCase(),
                    prenom: prenomMajuscule,
                    periode: this.select_periode,
                    n_facture: this.n_facture,
                    dateLimite: this.date,
                    modePaiement: this.select_paiement,
                    activites: this.activites,
                    dateCreation: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    montantTotal: mTotal,
                }
                
                this.facture = facture;
            }
            else {
                this.setMessage("error", "Veuillez remplir tout les champs de la facture");
            }
        },
        getFactureHTML() {
            const html = createHTML(this.facture);

            this.factureHTML = html;
        },
        creerPDF() {
            this.genererJSON();
            this.getFactureHTML();
            
            if (this.pdfPath.length === 0) {
                this.setMessage("error", "Veuillez renseigner un chemin de destination.");
            }

            let options = { 
                margin: 1,
                filename: this.pdfPath.path.replace(this.pdfPath.name, "") + (this.nomFichier ? `${this.nomFichier}.pdf` : "")
            }
            let file = this.factureHTML;

            html2pdf(file, options);

            this.bottom = !this.bottom;
        },
        save() {
            this.genererJSON();

            if (!this.message) {   
                let arr = this.factures;
                if (arr.length) {
                    let index = 0;

                    console.log("toto");
                    for (let k = 0; k < arr.length; k++) {
                        if (arr[k].n_facture === this.facture.n_facture) {
                            index = k;
                            this.retirerElm(arr, index);

                            break;
                        }
                    }
                }
                    
                this.factures.push(this.facture);
                const data = JSON.stringify(this.factures, "", "\t");
                
                let username = child_process.execSync("whoami", { encoding: "utf-8" });
                let name = username.split("\n")[0];

                fs.writeFile(`/Users/${name}/Documents/Gestionnaire_factures/factures.json`, data, "utf-8", (err) => {
                    if (err) {
                        this.setMessage("error", err);
                        throw err;
                    };
                    
                    this.step = 4; 
                    this.bottom = !this.bottom;
                    this.setMessage("success", "La facture a été enregistrée avec succes !");
                });
            }
        },
        /**
         * @param {Object} facture 
         */
        editFacture(facture) {
            localStorage.setItem("facture", JSON.stringify(facture));
            window.location.href = "index.html";
        },
        /**
         * 
         * @param {String} id 
         */
        disabledButton: (id) => {
            if (id === "export") {
                document.querySelector(`#export`).disabled = false;
            }
        }
    },
    mounted () {
        const title = document.querySelector("title#title");
        const view = document.querySelector("view").getAttribute("name");

        title.innerText = `Gestionnaire de factures - ${view}`;

        const theme = localStorage.getItem("theme");
        if (theme) {
            if (theme === "true") {
                this.$vuetify.theme.dark = true;
                this.switch1 = true;
            } else {
                this.$vuetify.theme.dark = false;
                this.switch1 = false;
            }
        }
        else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.$vuetify.theme.dark = true;
            localStorage.setItem("theme", this.$vuetify.theme.dark.toString());
        }
    },
    created () {
        var facture = localStorage.getItem("facture");

        let username = child_process.execSync("whoami", { encoding: "utf-8" });
        let name = username.split("\n")[0];

        if (!fs.existsSync(`/Users/${name}/Documents/Gestionnaire_factures`)) {
            child_process.execSync(`mkdir /Users/${name}/Documents/Gestionnaire_factures`);
            child_process.execSync(`echo [] > /Users/${name}/Documents/Gestionnaire_factures/factures.json`);
        }

        let factures = fs.readFileSync(`/Users/${name}/Documents/Gestionnaire_factures/factures.json`, { encoding: "utf-8" });

        factures = JSON.parse(factures);

        factures.forEach((item) => {
            item.client = `${item.nom} ${item.prenom}`;
        });
        
        this.factures = factures;

        if (facture) {
            facture = JSON.parse(facture);

            this.nom_client = facture.nom;
            this.prenom_client = facture.prenom;
            this.select_periode = facture.periode;
            this.n_facture = facture.n_facture;
            this.date = facture.dateLimite;
            this.select_paiement = facture.modePaiement;
            this.activites = facture.activites;
            this.dateCreation = facture.dateCreation;
            this.montantTotal = facture.montantTotal;

            localStorage.removeItem("facture");
        }
        else {
            if (this.factures.length == 0) {
                this.n_facture = `${new Date().getUTCFullYear()}-1`;
            }
            else {
                let id = this.factures[this.factures.length - 1].n_facture;
                id = id.split("-");
    
                this.n_facture = `${id[0]}-${Number(id[1])+1}`;
            }
        }
    },
});