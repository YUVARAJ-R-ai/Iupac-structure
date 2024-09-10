// import {
//     find_side,
//     find_hypo
// }from'./alkylstruc.js';
// console.log("Hello this is my chemistry project");
/**
 * @type HTMLCanvasElement 
 */

const structure_finder = () => {//fn structure finder
    const canvas = document.getElementById("canvas");//initializing canvas varible with the html canvas element 
    const c = canvas.getContext("2d");//c is like our pen for ploting 
    c.clearRect(0, 0, canvas.width, canvas.height);//clearing the canvas befor drawing 
    c.beginPath()
    const find_hypo = (base, high) => {//function to find hypotenuse of a right angled triangle if base and hight are given
        let hypo = (((base) ** 2) + ((high) ** 2)) ** (1 / 2)
        return hypo
    }
    const find_side = (hypo, base) => {//function to find the side if hypotenuse and base are given
        let side = (((hypo) ** 2) - ((base) ** 2)) ** (1 / 2)
        return side
    }
    function hasRepeatingElements(array) {
        let flag = 0;
        const elementCounts = {};

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            elementCounts[element] = (elementCounts[element] || 0) + 1;

            if (elementCounts[element] > 1) {
                flag = 1;
                break;
            }
        }

        return flag;
    }

    const findRepeatedElement = (array) => {
        const elementCounts = {};
        let repeated
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            elementCounts[element] = (elementCounts[element] || 0) + 1;
            if (elementCounts[element] > 1) {
                repeated = element
                break;
            }

        }
        return repeated


    }
    function count(main_str, sub_str) //function to count the frequence of a substring in string 
    {
        main_str += '';
        sub_str += '';

        if (sub_str.length <= 0) {
            return main_str.length + 1;
        }

        let subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
    }
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    let iupac = (document.getElementById("iupac").value).toLowerCase();
    let iupac_len = iupac.length;
    let No_C_suffix = { "meth": 1, "eth": 2, 'prop': 3, 'but': 4, 'pent': 5, 'hex': 6, 'hept': 7, 'oct': 8, 'non': 9, 'dec': 10 };//object for suffix and number of carbon atoms
    console.log(iupac);
    var temp_ob_1 = {}, no_c//temprorary object to store the suffixs name and their index in iupac
    for (const i in No_C_suffix) {

        if (iupac.includes(i)) {
            temp_ob_1[i] = iupac.indexOf(i)//if the suffic is present in iupac ,then the suffix and its index is added to the temporary object 
        }
    }
    console.log(temp_ob_1);
    suff = Object.keys(temp_ob_1).reduce((a, b) => temp_ob_1[a] > temp_ob_1[b] ? a : b);//reduce -higher order function to find the suffix having the hightest index number and concluding it as the parent chain
    no_c = No_C_suffix[suff]
    console.log(`No. of carbon in this iupac name is ${no_c}`)


    let alkyl_suffix = { "methyl": 1, "ethyl": 2, 'propyl': 3, 'butyl': 4 };//object for alkyl groupyl and number of carbon atoms
    let alkyl_txt = { 
    "methyl": "CH3", 
    "ethyl": "C2H5", 
    'propyl': "C3H7", 
    'butyl': "C4H9",
    }
    let funct_prefix={
        "chloro":"Cl",
        "bromo":"Br",
        "iodo":"I",
        "fluro":"F"
    }
    var temp_ob_2 = {}//temporary object 2 for alkyl group and its locant
    // var temp_ob_3={}//index of di and tri 
    var temp_ar_di, temp_ar_tri, temp_ar_solo, j//To store the locants of di,tri and solo alkyls and j is is used strore the index of i
    let temp_iupac = iupac//storing iupac in temp_iupac to create permanent changes
    var temp_ob_2_values, temp_ob_2_values_1
    let flag = 0


    for (const i in alkyl_suffix) {//i will be increamented with string value of alkyl groups.eg:methyl,ethyl....
        // console.log(`number of time ${i} repeats=`, count(temp_iupac, i))

        if (temp_iupac.includes(i)) {
            if (i == "ethyl" && temp_iupac[temp_iupac.indexOf(i) - 1] == 'm' && temp_iupac[temp_iupac.indexOf(i) - 1] != '-') {
                console.log("came")
                continue;//neglecting to count count ethyl if there is m before it 
            }

            j = temp_iupac.indexOf(i);//stroring the index number of i in temp_iupac as j
            if (temp_iupac[j - 1] == "i" && temp_iupac[j - 2] == "d") {
                temp_ar_di = [Number(temp_iupac[j - 4]), Number(temp_iupac[j - 6])]
                temp_ob_2[i] = temp_ar_di
            }
            else if (temp_iupac[j - 1] == 'i' && temp_iupac[j - 2] == 'r' && temp_iupac[j - 3] == 't') {
                temp_ar_tri = [Number(temp_iupac[j - 5]), Number(temp_iupac[j - 7]), Number(temp_iupac[j - 9])]
                temp_ob_2[i] = temp_ar_tri
                console.log(Number(temp_iupac[j - 9]))
            }
            else {

                temp_ar_solo = [Number(temp_iupac[j - 2])]
                temp_ob_2[i] = temp_ar_solo


            }

        }
        temp_iupac = temp_iupac.replace(i, "****")//replacing i with some other string so to avoid it being counter in the next increment 
        //console.log(temp_iupac)
    }


    console.log("The alkyl groups present in the iupac name and their locants")
    console.log(temp_ob_2)
    // temp_ob_2_values = Object.values(temp_ob_2)
    // console.log(temp_ob_2_values)
    // temp_ob_2_values_1 = []
    // for (let i of temp_ob_2_values) {
    //     for (let j of i) {

    //         temp_ob_2_values_1.push(j)

    //     }
    // }
    // console.log(temp_ob_2_values_1)



    c.lineWidth = 2;//initializing line width
    c.strokeStyle="#ffffff"
    c.fillStyle = "#ffffff"
    c.font = "bold 24px sans-sherif"
    const centerX = canvas.width / 2;//Center X of the canvas 
    const centerY = canvas.height / 2;//center Y of the canvas 
    let base = 80//pre calculated half of the base of the triangle
    let high = 43//pre calculated hight of the triangle
    var xposi, temp_var1, locant, temp_var3, temp_locant, temp_var4;
    let hypo = find_hypo(base, high)
    let side = find_side(hypo, base)

    while (no_c * base > canvas.width - 100) {//adjusting the size of the straight chain based on its length 
        base -= 1
        high -= 1

    }



    xposi = centerX - ((no_c / 2) * base)//defining xposi based on the lenght of the parent chain 


    c.moveTo(xposi, centerY);//move the marker to the starting position

    for (let i = 1; i <= no_c - 1; i++) {//loop to plot the parent chain 
        if (i % 2 != 0) {
            c.lineTo(xposi + base * i, centerY - high);
            c.stroke()


        }
        else {
            c.lineTo(xposi + base * i, centerY);
            c.stroke()

        }

    }

    for (let j in temp_ob_2) {
        //console.log(alkyl_suffix[i])
        temp_var1 = alkyl_suffix[j]
        temp_var4 = alkyl_txt[j]

        locant = temp_ob_2[j]
        //console.log(locant)
        flag = hasRepeatingElements(locant)
        console.log(flag)
        temp_var3 = findRepeatedElement(locant)
        console.log(temp_var3)
        temp_locant = removeDuplicates(locant)
        console.log(temp_locant)

        if (flag == 1) {
            for (let i of temp_locant) {
                i = i - 1
                //console.log(i)

                let temp_var2 = xposi + base * i
                var x_loc = temp_var2, y_loc = centerY
                if (i + 1 == temp_var3) {
                    if (i % 2 != 0) {
                        y_loc -= 43
                        c.moveTo(x_loc, y_loc);
                        c.lineTo(x_loc - 60, y_loc - base)
                        c.stroke()
                        c.fillText(temp_var4, x_loc - 120, y_loc - base)
                        c.moveTo(x_loc, y_loc)
                        c.lineTo(x_loc + 60, y_loc - base)
                        c.stroke()
                        c.fillText(temp_var4, x_loc + 60, y_loc - base)

                    }
                    else {
                        c.moveTo(x_loc, y_loc);
                        c.lineTo(x_loc - 60, y_loc + base)
                        c.stroke()
                        c.fillText(temp_var4, x_loc - 100, y_loc + base+20)
                        c.moveTo(x_loc, y_loc);
                        c.lineTo(x_loc + 60, y_loc + base)
                        c.stroke()
                        c.fillText(temp_var4, x_loc + 60, y_loc + base+20   )

                    }

                }
                else {
                    if (i % 2 == 0) {
                        c.moveTo(temp_var2, centerY);
                        for (let j = 1; j <= temp_var1; j++) {
                            if (j % 2 != 0) {
                                c.lineTo(x_loc, y_loc + hypo)
                                c.stroke()
                                y_loc += hypo

                            }
                            else {
                                c.lineTo(x_loc + base, y_loc + side)
                                c.stroke()
                                y_loc += side
                                x_loc += base

                            }

                        }

                    }
                    else {
                        c.moveTo(temp_var2, centerY - 43);
                        y_loc -= 43
                        for (let j = 1; j <= temp_var1; j++) {
                            if (j % 2 != 0) {
                                c.lineTo(x_loc, y_loc - hypo)
                                c.stroke()
                                y_loc -= hypo

                            }
                            else {
                                c.lineTo(x_loc + base, y_loc - side)
                                c.stroke()
                                y_loc -= side
                                x_loc += base

                            }
                        }
                    }

                }
            }


        }
        else {
            for (let i of locant) {
                i = i - 1
                //console.log(i)

                let temp_var2 = xposi + base * i
                var x_loc = temp_var2, y_loc = centerY
                if (i % 2 == 0) {
                    c.moveTo(temp_var2, centerY);
                    for (let j = 1; j <= temp_var1; j++) {
                        if (j % 2 != 0) {
                            c.lineTo(x_loc, y_loc + hypo)
                            c.stroke()
                            y_loc += hypo

                        }
                        else {
                            c.lineTo(x_loc + base, y_loc + side)
                            c.stroke()
                            y_loc += side
                            x_loc += base

                        }

                    }

                }
                else {
                    c.moveTo(temp_var2, centerY - 43);
                    y_loc -= 43
                    for (let j = 1; j <= temp_var1; j++) {
                        if (j % 2 != 0) {
                            c.lineTo(x_loc, y_loc - hypo)
                            c.stroke()
                            y_loc -= hypo

                        }
                        else {
                            c.lineTo(x_loc + base, y_loc - side)
                            c.stroke()
                            y_loc -= side
                            x_loc += base

                        }
                    }
                }
            }

        }
    }

}




