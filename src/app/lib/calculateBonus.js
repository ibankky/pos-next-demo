export function calculateBonus({
    totSpending,       // ยอดใช้จ่ายทั้งหมด
    memberEstamp,      // จำนวนแต้ม e-stamp
    persent,           // เปอร์เซ็นต์เงินคืน เช่น 0.1
    priceToPoint,      // กี่แต้ม = 1 บาท
    minPrize,          // ขอบเขตขั้นต่ำ e-stamp (เช่น 0.2)
    maxPrize           // ขอบเขตสูงสุด e-stamp
  }) {
    const returnBath = totSpending * persent;
    console.log('return bath');
    console.log(returnBath);
  
    let estampBaht = Math.round(memberEstamp / priceToPoint);
    const minEstampBaht = totSpending * minPrize;
    const maxEstampBaht = totSpending * maxPrize;
  
    let extraBaht = 0;
    let finalPoint = memberEstamp;
  
    if (estampBaht < minEstampBaht) {
      estampBaht = Math.ceil(minEstampBaht);
      finalPoint = estampBaht * priceToPoint;
    } else if (estampBaht > maxEstampBaht) {
      extraBaht = Math.ceil(estampBaht - maxEstampBaht);
      estampBaht = Math.round(maxEstampBaht);
      finalPoint = memberEstamp;
    }
  
    const joylicoinCal = returnBath - estampBaht;
    console.log('extran bath');
    console.log(extraBaht);
  
    return {
      returnBath: returnBath.toFixed(2),
      estampBaht: estampBaht.toFixed(2),
      minEstampBaht: minEstampBaht.toFixed(2),
      maxEstampBaht: maxEstampBaht.toFixed(2),
      finalPoint: parseFloat(finalPoint.toString()).toFixed(2),
      extraBaht: extraBaht.toFixed(2),
      joylicoinCal: joylicoinCal.toFixed(2),
      totalGetText: `${(estampBaht + extraBaht).toFixed(2)} บาท และ Joylicoin ${joylicoinCal.toFixed(2)}`
    };
  }
  