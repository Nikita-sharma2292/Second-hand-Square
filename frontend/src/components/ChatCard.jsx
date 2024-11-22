import React, { useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa6";
var QRCode = require("qrcode.react").default;

function ChatCard() {
  const [loading, setLoading] = useState(false);
  // const [phone, setPhone] = useState("");
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState(false);
  // let phone = localStorage.getItem('phone');
  let phone = '7976973622';

  const getQRCode = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:4000/api", { phone, msg });
    setQRCode(res.data);
    setLoading(false);
  };

  return (
    <div className="bg-green-50 h-screen w-full flex items-center justify-center">
      <div className="h-5/6 w-2/4 shadow-2xl bg-white border border-green-800 rounded-2xl flex flex-col items-center ">
        <div className="text-4xl font-medium text-green-800 flex flex-row pt-10">
          <div><FaWhatsapp size={45} color="Green-800"/></div>
          <div className="ml-5">Send Message</div>
        </div>
        <div className="h-48 w-10/12 pt-10 mb-8">
          <textarea type="text" value={msg} name="msg" id="msg" placeholder="Your Message*" onChange={(e) => { setMessage(e.target.value) }} 
            className="h-48 shadow-lg border border-gray-500 text-gray-700 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 "
          />
        </div>
        
        {!loading && qrcode && (
          <div className="h-36 mt-10 w-10/12 flex justify-center block p-2.5">
           <QRCode value={qrcode} />
         </div>
        )}

        <div className="mt-10 mb-5 flex flex-row gap-12">
          <button className="hover:bg-green-700 w-36 shadow-lg h-12 border border-green-800 p-3 rounded-2xl bg-green-800 text-white text-gray-600 font-bold text-[15px] block" onClick={getQRCode}>Get QRCode</button>
          <button className="hover:bg-green-700 w-36 shadow-lg h-12 border border-green-800 p-3 rounded-2xl bg-green-800 text-white text-gray-600 font-bold text-[15px] block">Send</button>
        </div>
        {loading && "Waiting for QRCode..."}
      
      </div>      
    </div>
  );
};

export default ChatCard;


      // Phone Number:
      // <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      // Message:
      // <input value={msg} onChange={(e) => setMessage(e.target.value)} />
      // <button onClick={getQRCode}>Get QRCode</button>
      // {!loading && qrcode && (
      //   <div style={{ margin: "100px" }}>
      //     <QRCode value={qrcode} />
      //   </div>
      // )}
      // {loading && "Waiting for QRCode..."}
