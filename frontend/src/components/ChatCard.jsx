import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetProducts } from "../features/productSlice";
var QRCode = require("qrcode.react").default;

function ChatCard() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState("");
  const [qrScanned, setQRScanned] = useState(false); // Track if QR code is scanned
  const [messageSent, setMessageSent] = useState(false); // Track if the message is sent

  const { product } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    setPhone("+"+"91"+product.owner.phone);

    dispatch(resetProducts());
  }, [product]);

  const getQRCode = async () => {
    setLoading(true);
    setQRScanned(false);
    setMessageSent(false);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        phone,
        msg,
      });
      setQRCode(res.data.qrcode);
      toast.success("QR Code generated. Scan it with WhatsApp!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate QR Code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simulate checking if the QR code is scanned and message sent
  useEffect(() => {
    if (qrcode && !qrScanned) {
      const checkScanStatus = setInterval(async () => {
        try {
          // Simulate backend endpoint to check scan status
          const res = await axios.get("http://localhost:5000/api/chat/status"); 
          if (res.data.qrScanned) {
            setQRScanned(true);
          }
          if (res.data.messageSent) {
            setMessageSent(true);
            toast.success("Message sent successfully!");
            clearInterval(checkScanStatus); // Stop checking once message is sent
          }
        } catch (err) {
          console.error("Error checking status:", err);
        }
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(checkScanStatus); // Cleanup interval on unmount
    }
  }, [qrcode, qrScanned]);

  return (
    <div className="bg-green-50 h-screen w-full flex items-center justify-center">
      <div className="h-5/6 w-2/4 shadow-2xl bg-white border border-green-800 rounded-2xl flex flex-col items-center ">
        <div className="text-4xl font-medium text-green-800 flex flex-row pt-10">
          <div>
            <FaWhatsapp size={45} color="Green-800" />
          </div>
          <div className="ml-5">Send Message</div>
        </div>
        <div className="h-48 w-10/12 pt-10 mb-8">
          <textarea
            type="text"
            value={msg}
            name="msg"
            id="msg"
            placeholder="Your Message*"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="h-48 shadow-lg border border-gray-500 text-gray-700 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 "
          />
        </div>

        {!loading && qrcode && (
          <div className="h-36 mt-10 w-10/12 flex justify-center block p-2.5">
            <QRCode value={qrcode} />
          </div>
        )}

        <div className="mt-10 mb-5 flex flex-row gap-12">
          <button
            className="hover:bg-green-700 w-36 shadow-lg h-12 border border-green-800 p-3 rounded-2xl bg-green-800 text-white text-gray-600 font-bold text-[15px] block"
            onClick={getQRCode}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get QRCode"}
          </button>
          <button
            className="hover:bg-green-700 w-36 shadow-lg h-12 border border-green-800 p-3 rounded-2xl bg-green-800 text-white text-gray-600 font-bold text-[15px] block"
            disabled={!qrScanned || messageSent}
          >
            Send
          </button>
        </div>

        {loading && <p>Waiting for QRCode...</p>}
        {/* {qrScanned && !messageSent && <p>QR Code scanned. Sending message...</p>} */}
        {messageSent && <p>Message sent successfully!</p>}
      </div>
    </div>
  );
}

export default ChatCard;
