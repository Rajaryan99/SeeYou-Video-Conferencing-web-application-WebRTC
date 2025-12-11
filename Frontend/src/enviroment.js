let is_prod= true;



const server = is_prod ?
    "https://seeyou-video-conferencing-web-kcrp.onrender.com" :

    "http://localhost:5000"


export default server;