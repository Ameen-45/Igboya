document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // FRACTION CALCULATOR
    // ======================
    function initFractionCalculator() {
        const calculatorForm = document.createElement('div');
        calculatorForm.className = 'fraction-calculator';
        calculatorForm.innerHTML = `
            <h3><i class="fas fa-calculator"></i> Fraction Calculator</h3>
            <div class="calculator-grid">
                <div class="calculator-input">
                    <label for="fraction1">Fraction 1:</label>
                    <input type="text" id="fraction1" placeholder="e.g. 3/4">
                </div>
                <div class="calculator-input">
                    <label for="fraction2">Fraction 2:</label>
                    <input type="text" id="fraction2" placeholder="e.g. 1/2">
                </div>
                <div class="calculator-buttons">
                    <button id="calc-add">+</button>
                    <button id="calc-subtract">-</button>
                    <button id="calc-multiply">×</button>
                    <button id="calc-divide">÷</button>
                </div>
                <div class="calculator-result">
                    <p>Result: <span id="fraction-result">0</span></p>
                </div>
            </div>
        `;

        // Insert calculator after the introduction section
        const introSection = document.getElementById('introduction');
        if (introSection) {
            introSection.insertAdjacentElement('afterend', calculatorForm);
        }

        // Helper function to parse fractions
        function parseFraction(fractionStr) {
            if (fractionStr.includes('/')) {
                const [numerator, denominator] = fractionStr.split('/').map(Number);
                return { numerator, denominator };
            } else if (fractionStr.includes(' ')) {
                const [whole, fraction] = fractionStr.split(' ');
                const [numerator, denominator] = fraction.split('/').map(Number);
                return { 
                    numerator: (Number(whole) * denominator) + numerator, 
                    denominator 
                };
            } else {
                return { numerator: Number(fractionStr), denominator: 1 };
            }
        }

        // Helper function to simplify fractions
        function simplifyFraction(numerator, denominator) {
            const gcd = (a, b) => b ? gcd(b, a % b) : a;
            const divisor = gcd(numerator, denominator);
            return {
                numerator: numerator / divisor,
                denominator: denominator / divisor
            };
        }

        // Helper function to display result
        function displayResult(numerator, denominator) {
            const simplified = simplifyFraction(numerator, denominator);
            
            if (simplified.denominator === 1) {
                return simplified.numerator.toString();
            } else if (Math.abs(simplified.numerator) > simplified.denominator) {
                const whole = Math.floor(simplified.numerator / simplified.denominator);
                const remainder = Math.abs(simplified.numerator % simplified.denominator);
                return `${whole} ${remainder}/${simplified.denominator}`;
            } else {
                return `${simplified.numerator}/${simplified.denominator}`;
            }
        }

        // Calculator functionality
        document.getElementById('calc-add').addEventListener('click', function() {
            const fraction1 = document.getElementById('fraction1').value;
            const fraction2 = document.getElementById('fraction2').value;
            
            try {
                const f1 = parseFraction(fraction1);
                const f2 = parseFraction(fraction2);
                
                const lcm = (f1.denominator * f2.denominator) / 
                           gcd(f1.denominator, f2.denominator);
                
                const newNumerator = (f1.numerator * (lcm / f1.denominator)) + 
                                    (f2.numerator * (lcm / f2.denominator));
                
                document.getElementById('fraction-result').textContent = 
                    displayResult(newNumerator, lcm);
            } catch (e) {
                document.getElementById('fraction-result').textContent = 'Invalid input';
            }
        });

        document.getElementById('calc-subtract').addEventListener('click', function() {
            const fraction1 = document.getElementById('fraction1').value;
            const fraction2 = document.getElementById('fraction2').value;
            
            try {
                const f1 = parseFraction(fraction1);
                const f2 = parseFraction(fraction2);
                
                const lcm = (f1.denominator * f2.denominator) / 
                           gcd(f1.denominator, f2.denominator);
                
                const newNumerator = (f1.numerator * (lcm / f1.denominator)) - 
                                    (f2.numerator * (lcm / f2.denominator));
                
                document.getElementById('fraction-result').textContent = 
                    displayResult(newNumerator, lcm);
            } catch (e) {
                document.getElementById('fraction-result').textContent = 'Invalid input';
            }
        });

        document.getElementById('calc-multiply').addEventListener('click', function() {
            const fraction1 = document.getElementById('fraction1').value;
            const fraction2 = document.getElementById('fraction2').value;
            
            try {
                const f1 = parseFraction(fraction1);
                const f2 = parseFraction(fraction2);
                
                const newNumerator = f1.numerator * f2.numerator;
                const newDenominator = f1.denominator * f2.denominator;
                
                document.getElementById('fraction-result').textContent = 
                    displayResult(newNumerator, newDenominator);
            } catch (e) {
                document.getElementById('fraction-result').textContent = 'Invalid input';
            }
        });

        document.getElementById('calc-divide').addEventListener('click', function() {
            const fraction1 = document.getElementById('fraction1').value;
            const fraction2 = document.getElementById('fraction2').value;
            
            try {
                const f1 = parseFraction(fraction1);
                const f2 = parseFraction(fraction2);
                
                if (f2.numerator === 0) {
                    document.getElementById('fraction-result').textContent = 'Undefined';
                    return;
                }
                
                const newNumerator = f1.numerator * f2.denominator;
                const newDenominator = f1.denominator * f2.numerator;
                
                document.getElementById('fraction-result').textContent = 
                    displayResult(newNumerator, newDenominator);
            } catch (e) {
                document.getElementById('fraction-result').textContent = 'Invalid input';
            }
        });

        // GCD helper function
        function gcd(a, b) {
            return b ? gcd(b, a % b) : a;
        }
    }

    // ======================
    // INTERACTIVE FRACTION VISUALIZER
    // ======================
    function initFractionVisualizer() {
        const visualizerSection = document.getElementById('introduction');
        if (!visualizerSection) return;

        const visualizer = document.createElement('div');
        visualizer.className = 'fraction-visualizer';
        visualizer.innerHTML = `
            <h3><i class="fas fa-chart-pie"></i> Fraction Visualizer</h3>
            <div class="visualizer-controls">
                <label for="vis-numerator">Numerator:</label>
                <input type="range" id="vis-numerator" min="0" max="8" value="3">
                <span id="vis-num-display">3</span>
                
                <label for="vis-denominator">Denominator:</label>
                <input type="range" id="vis-denominator" min="1" max="8" value="4">
                <span id="vis-denom-display">4</span>
            </div>
            <div class="visualizer-display">
                <div class="fraction-circle"></div>
                <div class="fraction-text">
                    <span id="vis-fraction">3/4</span>
                    <span id="vis-decimal">= 0.75</span>
                    <span id="vis-percent">= 75%</span>
                </div>
            </div>
        `;

        visualizerSection.appendChild(visualizer);

        const numeratorSlider = visualizer.querySelector('#vis-numerator');
        const denominatorSlider = visualizer.querySelector('#vis-denominator');
        const numDisplay = visualizer.querySelector('#vis-num-display');
        const denomDisplay = visualizer.querySelector('#vis-denom-display');
        const fractionCircle = visualizer.querySelector('.fraction-circle');
        const fractionText = visualizer.querySelector('#vis-fraction');
        const decimalText = visualizer.querySelector('#vis-decimal');
        const percentText = visualizer.querySelector('#vis-percent');

        function updateVisualizer() {
            const numerator = parseInt(numeratorSlider.value);
            const denominator = parseInt(denominatorSlider.value);
            
            // Update displays
            numDisplay.textContent = numerator;
            denomDisplay.textContent = denominator;
            fractionText.textContent = `${numerator}/${denominator}`;
            
            // Calculate decimal and percentage
            const decimal = numerator / denominator;
            decimalText.textContent = `= ${decimal.toFixed(2)}`;
            percentText.textContent = `= ${(decimal * 100).toFixed(0)}%`;
            
            // Update circle visualization
            fractionCircle.innerHTML = '';
            fractionCircle.style.setProperty('--denominator', denominator);
            fractionCircle.style.setProperty('--numerator', Math.min(numerator, denominator));
            
            for (let i = 0; i < denominator; i++) {
                const slice = document.createElement('div');
                slice.className = 'circle-slice';
                slice.style.setProperty('--slice-index', i);
                
                if (i < numerator) {
                    slice.classList.add('filled');
                }
                
                fractionCircle.appendChild(slice);
            }
        }

        numeratorSlider.addEventListener('input', updateVisualizer);
        denominatorSlider.addEventListener('input', function() {
            // Ensure numerator doesn't exceed denominator
            if (parseInt(numeratorSlider.value) > parseInt(this.value)) {
                numeratorSlider.value = this.value;
            }
            numeratorSlider.max = this.value;
            updateVisualizer();
        });

        // Initialize
        updateVisualizer();
    }

    // ======================
    // EXERCISE SOLUTIONS TOGGLE
    // ======================
    function initExerciseSolutions() {
        const exercisesSection = document.getElementById('fraction-exercises');
        if (!exercisesSection) return;

        const solutions = [
            // Basic Fraction Concepts (1-8)
            "Numerator: 5, Denominator: 8",
            "2¼",
            "17/5",
            "7/4",
            "1⅖",
            "1/3 + 1/3 (sum of unit fractions)",
            "Proper fraction",
            "3⅓",
            
            // Fraction Operations (9-16)
            "1/2", "3/8", "6/35", "9/8", "1", "4/9", "3/10", "3/2",
            
            // Comparisons and Conversions (17-21)
            "4/9 is larger", "0.625", "5/8", "35%", "2/5 is larger",
            
            // Word Problems (22-26)
            "3/8 cup", "2 7/12 feet", "90 girls", "2 pieces", "The whole book (2/3 × 3 = 2/3 + 2/3 + 2/3 = 6/3 = 1)"
        ];

        const solutionBtn = document.createElement('button');
        solutionBtn.className = 'show-solutions-btn';
        solutionBtn.textContent = 'Show Solutions';
        exercisesSection.appendChild(solutionBtn);

        solutionBtn.addEventListener('click', function() {
            const exerciseItems = exercisesSection.querySelectorAll('li');
            
            exerciseItems.forEach((item, index) => {
                if (index < solutions.length) {
                    const solutionDiv = document.createElement('div');
                    solutionDiv.className = 'exercise-solution';
                    solutionDiv.innerHTML = `<strong>Solution:</strong> ${solutions[index]}`;
                    
                    // Check if solution already exists
                    if (!item.querySelector('.exercise-solution')) {
                        item.appendChild(solutionDiv);
                    }
                }
            });
            
            this.textContent = this.textContent === 'Show Solutions' ? 'Hide Solutions' : 'Show Solutions';
            const solutionsVisible = this.textContent === 'Hide Solutions';
            
            const allSolutions = exercisesSection.querySelectorAll('.exercise-solution');
            allSolutions.forEach(solution => {
                solution.style.display = solutionsVisible ? 'block' : 'none';
            });
        });
    }

    // ======================
    // FRACTION CONVERSION TOOL
    // ======================
    function initConversionTool() {
        const conversionSection = document.getElementById('fraction-conversions');
        if (!conversionSection) return;

        const conversionTool = document.createElement('div');
        conversionTool.className = 'conversion-tool';
        conversionTool.innerHTML = `
            <h3><i class="fas fa-exchange-alt"></i> Conversion Tool</h3>
            <div class="conversion-input">
                <input type="text" id="conversion-input" placeholder="Enter fraction (e.g. 3/4 or 1½)">
                <select id="conversion-type">
                    <option value="decimal">To Decimal</option>
                    <option value="percent">To Percentage</option>
                    <option value="mixed">Improper to Mixed</option>
                    <option value="improper">Mixed to Improper</option>
                </select>
                <button id="convert-btn">Convert</button>
            </div>
            <div class="conversion-result">
                <p>Result: <span id="conversion-result">-</span></p>
            </div>
        `;

        conversionSection.appendChild(conversionTool);

        document.getElementById('convert-btn').addEventListener('click', function() {
            const input = document.getElementById('conversion-input').value.trim();
            const conversionType = document.getElementById('conversion-type').value;
            let result = '';

            try {
                if (input.includes('/')) {
                    // It's a fraction
                    const [numerator, denominator] = input.split('/').map(Number);
                    
                    if (denominator === 0) {
                        result = 'Undefined (division by zero)';
                    } else {
                        switch (conversionType) {
                            case 'decimal':
                                result = (numerator / denominator).toFixed(4);
                                break;
                            case 'percent':
                                result = `${(numerator / denominator * 100).toFixed(2)}%`;
                                break;
                            case 'mixed':
                                if (numerator >= denominator) {
                                    const whole = Math.floor(numerator / denominator);
                                    const remainder = numerator % denominator;
                                    result = remainder === 0 ? `${whole}` : `${whole} ${remainder}/${denominator}`;
                                } else {
                                    result = `${numerator}/${denominator} (already proper)`;
                                }
                                break;
                            case 'improper':
                                result = `${numerator}/${denominator} (already improper)`;
                                break;
                        }
                    }
                } else if (input.includes(' ')) {
                    // It's a mixed number
                    const parts = input.split(' ');
                    const whole = Number(parts[0]);
                    const [numerator, denominator] = parts[1].split('/').map(Number);
                    
                    switch (conversionType) {
                        case 'decimal':
                            result = (whole + (numerator / denominator)).toFixed(4);
                            break;
                        case 'percent':
                            result = `${((whole + (numerator / denominator)) * 100).toFixed(2)}%`;
                            break;
                        case 'mixed':
                            result = input;
                            break;
                        case 'improper':
                            result = `${(whole * denominator) + numerator}/${denominator}`;
                            break;
                    }
                } else {
                    // It's a decimal or whole number
                    const num = Number(input);
                    
                    switch (conversionType) {
                        case 'decimal':
                            result = num.toString();
                            break;
                        case 'percent':
                            result = `${(num * 100).toFixed(2)}%`;
                            break;
                        case 'mixed':
                        case 'improper':
                            result = `${num}/1`;
                            break;
                    }
                }
            } catch (e) {
                result = 'Invalid input';
            }

            document.getElementById('conversion-result').textContent = result;
        });
    }

    // ======================
    // FRACTION COMPARISON TOOL
    // ======================
    function initComparisonTool() {
        const comparisonSection = document.getElementById('fraction-comparison');
        if (!comparisonSection) return;

        const comparisonTool = document.createElement('div');
        comparisonTool.className = 'comparison-tool';
        comparisonTool.innerHTML = `
            <h3><i class="fas fa-balance-scale"></i> Comparison Tool</h3>
            <div class="comparison-inputs">
                <input type="text" id="compare-fraction1" placeholder="First fraction">
                <input type="text" id="compare-fraction2" placeholder="Second fraction">
                <button id="compare-btn">Compare</button>
            </div>
            <div class="comparison-result">
                <p>Result: <span id="comparison-result">-</span></p>
            </div>
        `;

        comparisonSection.appendChild(comparisonTool);

        document.getElementById('compare-btn').addEventListener('click', function() {
            const fraction1 = document.getElementById('compare-fraction1').value.trim();
            const fraction2 = document.getElementById('compare-fraction2').value.trim();
            
            try {
                const value1 = parseFractionValue(fraction1);
                const value2 = parseFractionValue(fraction2);
                
                let result;
                if (value1 > value2) {
                    result = `${fraction1} > ${fraction2}`;
                } else if (value1 < value2) {
                    result = `${fraction1} < ${fraction2}`;
                } else {
                    result = `${fraction1} = ${fraction2}`;
                }
                
                document.getElementById('comparison-result').textContent = result;
            } catch (e) {
                document.getElementById('comparison-result').textContent = 'Invalid input(s)';
            }
        });

        function parseFractionValue(fractionStr) {
            if (fractionStr.includes('/')) {
                const [numerator, denominator] = fractionStr.split('/').map(Number);
                return numerator / denominator;
            } else if (fractionStr.includes(' ')) {
                const [whole, fraction] = fractionStr.split(' ');
                const [numerator, denominator] = fraction.split('/').map(Number);
                return Number(whole) + (numerator / denominator);
            } else {
                return Number(fractionStr);
            }
        }
    }

    // ======================
    // INITIALIZE ALL FUNCTIONALITY
    // ======================
    function initFractionsApp() {
        initFractionCalculator();
        initFractionVisualizer();
        initExerciseSolutions();
        initConversionTool();
        initComparisonTool();
    }

    // Start the fractions application
    initFractionsApp();
});