function calculateBMI() {
    // 1. Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    // 2. Validate inputs
    if (!age || !weight || !heightCm) {
        alert("Please fill in all the required fields.");
        return;
    }

    // 3. Calculate BMI
    const heightM = heightCm / 100; 
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // 4. Calculate Ideal Weight Range (based on healthy BMI 18.5 - 24.9)
    const minIdealWeight = (18.5 * (heightM * heightM)).toFixed(1);
    const maxIdealWeight = (24.9 * (heightM * heightM)).toFixed(1);

    // 5. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr = (10 * weight) + (6.25 * heightCm) - (5 * age);
    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    // 6. Determine Category and Color
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

    // 7. Update the UI
    const resultBox = document.getElementById('result-box');
    const bmiValueText = document.getElementById('bmi-value');
    const bmiCategoryText = document.getElementById('bmi-category');
    const idealWeightText = document.getElementById('ideal-weight'); // New variable
    const bmrValueText = document.getElementById('bmr-value');

    // Reset classes
    resultBox.className = ""; 
    resultBox.classList.add(colorClass);

    // Inject the text
    bmiValueText.innerText = `BMI: ${bmi}`;
    bmiCategoryText.innerText = category;
    
    // Inject the new ideal weight text
    idealWeightText.innerText = `Ideal Weight Range: ${minIdealWeight} kg - ${maxIdealWeight} kg`;
    
    bmrValueText.innerText = `Est. Daily Resting Calories: ${Math.round(bmr)} kcal`;
}