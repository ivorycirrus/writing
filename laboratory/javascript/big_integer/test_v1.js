function test(){
	var result = document.getElementById("result");
	result.innerText += "\n"+"==[ toString ]========" + "\n";
	var num1 = new BigInt();
	var num2 = new BigInt(128);
	var num3 = new BigInt("12345678912233344455566677778888999900000012345678836");
	var num4 = new BigInt("-0003847294838293728");

	result.innerText += "undefined : " + num1.toString()+ "\n";
	result.innerText += "128 : " + num2.toString()+ "\n";
	result.innerText += "12345678912233344455566677778888999900000012345678836 : " + num3.toString()+ "\n";
	result.innerText += "-0003847294838293728 : " + num4.toString()+ "\n";

	result.innerText += "\n"+"==[ compare ]========"+ "\n";
	var cnum1 = new BigInt("111111111111111111111111111111111111111");
	var cnum2 = new BigInt("111111111111111111111111111111111111111");
	var cnum3 = new BigInt("-111111111111111111111111111111111111111");
	var cnum4 = new BigInt("111111111111111111122222222222211111111");
	var cnum5 = new BigInt("-111111111111111111122222222222211111111");

	result.innerText += cnum1.compare(cnum2) + " :: "+cnum1+" == "+cnum2+ "\n";
	result.innerText += cnum1.compare(cnum3) + " :: "+cnum1+" > "+cnum3+ "\n";
	result.innerText += cnum1.compare(cnum4) + " :: "+cnum1+" < "+cnum4+ "\n";
	result.innerText += cnum3.compare(cnum5) + " :: "+cnum3+" > "+cnum5+ "\n";

	result.innerText += "\n"+"==[ add same sign ]========"+ "\n";
	var anum2 = new BigInt("22222222222222222222222222222222222222222222222");
	var anum7 = new BigInt("777777777777777777777777777777777777777777777777");
	var anum2m = new BigInt("-22222222222222222222222222222222222222222222222");
	var anum7m = new BigInt("-777777777777777777777777777777777777777777777777");
	var anum9m = new BigInt("-9999999999999999999999999999999999999999999999999");

	result.innerText += anum2.add(anum2).toString()+ "\n";
	result.innerText += anum7.add(anum7).toString()+ "\n";
	result.innerText += anum2m.add(anum7m).toString()+ "\n";
	result.innerText += anum9m.add(anum9m).toString()+ "\n";

	result.innerText += "\n"+"==[ sub same sign ]========"+ "\n";
	var snum1p = new BigInt("1111");
	var snum2p = new BigInt("2222");
	var snum2m = new BigInt("-2222");
	var snum90a = new BigInt("90001");

	result.innerText += snum2p + " - " + snum1p + " = " + snum2p.sub(snum1p)+ "\n";
	result.innerText += snum2p + " - " + snum2p + " = " + snum2p.sub(snum2p)+ "\n";
	result.innerText += snum2m + " - " + snum2p + " = " + snum2m.sub(snum2p)+ "\n";
	result.innerText += snum1p + " - " + snum2p + " = " + snum1p.sub(snum2p)+ "\n";
	result.innerText += snum90a + " - " + snum2p + " = " + snum90a.sub(snum2p)+ "\n";
	result.innerText += anum7m + ' - ' + anum9m + ' = ' + anum7m.sub(anum9m)+ "\n";

	result.innerText += "\n"+"==[ add/sub different sign ]========"+ "\n";
	result.innerText += snum2p + ' + ' + snum2m + ' = ' + snum2p.add(snum2m)+ "\n";
	result.innerText += snum2m + ' + ' + snum2p + ' = ' + snum2m.add(snum2p)+ "\n";
	result.innerText += snum2p + ' - ' + snum2m + ' = ' + snum2p.sub(snum2m)+ "\n";
	result.innerText += snum2m + ' - ' + snum2p + ' = ' + snum2m.sub(snum2p)+ "\n";

	result.innerText += "\n"+"==[ multiply ]========"+ "\n";
	var m1 = new BigInt("12");
	var m2 = new BigInt("20");
	var m3 = new BigInt("-34");
	var m4 = new BigInt("-50");

	result.innerText += m1 + " * " + m1 + " = " + m1.multiply(m1)+ "\n";
	result.innerText += m1 + " * " + m2 + " = " + m1.multiply(m2)+ "\n";
	result.innerText += m2 + " * " + m2 + " = " + m2.multiply(m2)+ "\n";
	result.innerText += m1 + " * " + m4 + " = " + m1.multiply(m4)+ "\n";
	result.innerText += m3 + " * " + m2 + " = " + m3.multiply(m2)+ "\n";
	result.innerText += (m3 + " * " + m4 + " = " + m3.multiply(m4)+ "\n");

}