[accounts]
; comma separated list of usernames that are considered server accounts
; these accounts will be created upon the first run of snow
; they will have max permissions with snow and will have no discord account linked
gods=god,snow,kaede,gameserver
; comma separated list of usernames that are considered owner accounts
; these accounts must already exist in the database
owners=ectrc
; comma seperated list of exchange codes used for the server account
; the password method of loggin can also accept these codes if they start with "code://"
codes=

[database]
; connect string
uri="host=localhost user=postgres password=pass dbname=snow port=5432 sslmode=disable"
; currently only postgres is supported. memory and mongo will be added in the future
type="postgres"
; WARNING: ONLY USE IF NECESSARY
; deletes and resets the entire database on startup
drop=false

[amazon]
; bucket uri of your s3 storage
; leave blank to disable s3 storage
uri=""
; access key id for the amazon s3 bucket
id="36a3297c08..."
; secret access key for the amazon s3 bucket
key="4e5274c62b7b8c3..."
; path to the bucket in the s3 storage that will store the client settings
bucket="snow"

[discord]
; discord id of the bot
id="1234567890..."
; oauth2 client secret
secret="abcdefg..."
; discord bot token
token="OTK...."
; server id
guild="1234567890..."
; id of discord built in server booster role
; used for automatic booster rewards
boost_role_id="1234567890..."
; used for automatic donate rewards
crystal_donator_role_id="1234567890..."
; used for automatic donate rewards
llama_donator_role_id="1234567890..."
; let players know that the servers are up
eu_servers_role_id="1234567890..."
; used for content creator pack
cc_role_id="123123123...."
; used for retrac plus
retrac_plus_role_id="2313123....."
; used for retrac ultiamte
ultimate_role_id="23123123....."
; staff roleee
staff_role_id="123123123......"
; channel used to send the report message
report_channel_id="1234567890..."
; channel used to send the status messages
status_channel_id="12312412....."
; where ban logs are sent
logs_channel_id="123123123....."

[output]
; level of logging
; info = backend logs
; time = backend logs + time taken for database queries
; prod = only errors
level="info"

[api]
; this will enable some routes to show information about the backend
; this is useful for debugging 
; this should be disabled in production
debug=true
; port to listen on
port=":3000"
; domain of the xmpp server for fortnite to connect to
xmpp_domain="ws://127.0.0.1:3000"
; callback url of the discord oauth2. ; should be the server domain
discord_domain="http://127.0.0.1:3000"
; domain of the matchmaker server for fortnite to connect to
matchmaker_domain="ws://127.0.0.1:3000"

frontend_domain="http://127.0.0.1:5173"

; domain of the game hoster snow will use to try and create game servers
eu_hoster_domains=http://127.0.0.1:3001,http://127.0.0.1:3002
na_hoster_domains=http://127.0.0.1:3001,http://127.0.0.1:3002
; api key for the vpn service
vpn_api_key="7CEC...."

[jwt]
; secret for jwt signing
secret="secret"

[fortnite]
allowed_seasons=8,14
; long string of the fortnite version
version=Fortnite+Release-8.51-CL-6165369-Windows
; fortnite build version
build=5.41
; on every account creation, all cosmetics will be added to the account
; if you want to disable this, set this to false
everything=true
; enable or disable the requirement of password to login to an account
; if this is set to true, you can login to any account using the username and any password
; if this is false you must login using an exchange code given by the bot
disable_password=false
; if you recieve lots of /account/api/oauth/token requests, set this to true
; this will disable the client credentials grant type
; however this will also disable a user to get the hotfixes before login
; enabling will disable the store tab
; so xmpp and other hotfix related things will be delayed by ~1 minute
disable_client_credentials=false
; this is used to generate a random shop
; each number will generate a different shop for the day
; the shop will stay the same for the entire day even after server restarts
shop_seed=0
; this will enable vbucks in the store tab
; at this time it is not possible to buy vbucks
; this is only for testing purposes
enable_vbucks=true
; only discord boosters can matchmake
; this is meant for limited testing
only_discord_boosters_can_matchmake=false
; these accounts bypass the only_discord_boosters_can_matchmake
; comma separated list of usernames
whitelisted_users_who_can_matchmake=god,a,ectrc