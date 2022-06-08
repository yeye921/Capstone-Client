import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { addrState, idState, nameState, pointState } from "../../../state";
import Button from "../../common/Button";
import { Input } from "./styles";

const Payment = (effect, deps) => {
  const [name, setName] = useRecoilState(nameState);
  const [addr, setAddr] = useRecoilState(addrState);
  const [uId, setuId] = useRecoilState(idState);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  const [point, setPoint] = useRecoilState(pointState);
  useEffect(() => {
    console.log(point);
  }, [point]);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp95466725");
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "삼삼오오 포인트 충전",
      amount: `${amount}`,
      buyer_name: `${name}`,
      buyer_tel: "010-2217-8663", //테스트용
      buyer_addr: `${addr}`,
      m_redirect_url: "http://3.39.164.26/payments/complete/mobile",
    };
    IMP.request_pay(data, callback);
  };

  const onChange = (e) => {
    setAmount(e.target.value);
  };

  const callback = async (response) => {
    console.log(response);
    await axios
      .post("http://3.39.164.26/payments/complete", {
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
        uId: uId,
      })
      .then((data) => {
        console.log(data.data);
        setPoint(data.data);
      });
  };

  return (
    <>
      <Input placeholder="충전금액입력" value={amount} onChange={onChange} />
      <Button onClick={onClickPayment}>충전</Button>
    </>
  );
};

export default Payment;
