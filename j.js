function calculateBMI() {
   
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);


    if (!age || !weight || !heightCm) {
        alert("Please fill in all the required fields");
        return;
    }
    

    if(age<=0 || weight<=0 ||heightCm<=0){
        alert('Invalid Value');
        return;
    }


    const heightM = heightCm / 100; 
    const bmi = (weight / (heightM * heightM)).toFixed(1);


    const minIdealWeight = (18.5 * (heightM * heightM)).toFixed(1);
    const maxIdealWeight = (24.9 * (heightM * heightM)).toFixed(1);

  
    let bmr = (10 * weight) + (6.25 * heightCm) - (5 * age);
    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    let category = "";
    let colorClass = "";

    if (bmi < 18.5) {
        category = "Underweight";
        colorClass = "bg-blue";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Healthy Weight";
        colorClass = "bg-green";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
        colorClass = "bg-orange";
    } else {
        category = "Obese";
        colorClass = "bg-red";
    }

    
    const resultBox = document.getElementById('result-box');
    const bmiValueText = document.getElementById('bmi-value');
    const bmiCategoryText = document.getElementById('bmi-category');
    const idealWeightText = document.getElementById('ideal-weight');
    const bmrValueText = document.getElementById('bmr-value');


    resultBox.className = ""; 
    resultBox.classList.add(colorClass);

    
    bmiValueText.innerText = `BMI: ${bmi}`;
    bmiCategoryText.innerText = category;
    

    idealWeightText.innerText = `Ideal Weight Range: ${minIdealWeight} kg - ${maxIdealWeight} kg`;
    
    bmrValueText.innerText = `Est. Daily Resting Calories: ${Math.round(bmr)} kcal`;
}

window.onload = displayHistory;

function calculateAndSave() {
    const weight = parseFloat(document.getElementById('currentWeight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // cm to m
    const target = parseFloat(document.getElementById('targetWeight').value);
    
    if (!weight || !height || !target) return alert("Please fill all fields");

    const bmi = (weight / (height * height)).toFixed(1);
    const weightDiff = Math.abs(weight - target);
    const weeksRequired = Math.ceil(weightDiff / 0.5); 
    const action = weight > target ? "lose" : "gain";

    const resultHTML = `
        <strong>Current BMI:</strong> ${bmi}<br>
        <strong>Goal:</strong> ${action} ${weightDiff.toFixed(1)} kg<br>
        <strong>Estimated Time:</strong> ${weeksRequired} weeks
    `;
    document.getElementById('results').innerHTML = resultHTML;

    const entry = {
        date: new Date().toLocaleDateString(),
        weight: weight,
        bmi: bmi
    };

    let history = JSON.parse(localStorage.getItem('weightHistory')) || [];
    history.unshift(entry);
    history = history.slice(0, 5); 
    
    localStorage.setItem('weightHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem('weightHistory')) || [];
    const tbody = document.getElementById('historyBody');
    tbody.innerHTML = history.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.weight}kg</td>
            <td>${item.bmi}</td>
        </tr>
    `).join('');
}

function goToPage(){
    window.location.href="h.html";
}

function resetTracker() {
    document.getElementById('currentWeight').value = '';
    document.getElementById('tracker-height').value = ''; 
    document.getElementById('targetWeight').value = '';

    document.getElementById('results').innerHTML = '';

    document.getElementById('historyBody').innerHTML = '';
}