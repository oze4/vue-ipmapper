let ipm_generate_map = {
    template: `
    <div :style='{ display: shown }'>

        <v-layout row wrap justify-center mb-2>
            
            <v-flex xs10 sm6 md4 lg4>
                <v-card style='overflow-x:auto;'>
                    <v-card-text>
                        <pre>{{ jsonResponse }}</pre>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>

        <v-layout row wrap justify-center>

            <v-flex xs10 sm10 md10 lg10>
                <v-card style='overflow-x:auto;'>
                    <!--<div id='map-display'></div>-->
                    <v-card-text>
                        <pre>{{ jsonResponse }}</pre>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>

    </div>
    `,
    props: {
        options: {
            type: Object,
        },
    },
    computed: {
        shown() {
            return this.isShown === false ? 'none' : '';
        },
        jsonResponse() {
            return JSON.stringify(this.response, undefined, 2)
        }
    },
    data() {
        return {
            isShown: false,
            response: '',
        };
    },
    watch: {
        options() {
            if (this.options) {
                this.mapData(this.options);
            }
        },
    },
    methods: {
        mapData(data) {
            // this is here to verify what we are being given
            switch (data.provider.name) {

                case "http://ip-api.com":
                    {
                        // No API key required here, but lets verify
                        if (data.provider.isKeyRequired === false) {
                            let h = data.host === '_current_' ? '' : data.host;
                            let u = `http://ip-api.com/json/${String(h)}`;
                            axios.get(u).then((response) => {
                                this.response = response.data;
                            }).catch((err) => {
                                alert(`Unable to gather map data from ${u}! We encountered the following error: ${err.error}`);
                            });

                            this.isShown = true;
                        }
                    }

                case "http://ipstack.com":
                    {
                        // API key is required here, lets verify
                        if (data.provider.isKeyRequired === true) {

                        }
                    }

            };

            // this.isShown = true;
        }
    },
}