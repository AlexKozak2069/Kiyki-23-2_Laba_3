        let currentExpression = '';
        let lastResult = '';
        
        function appendNumber(number) {
            currentExpression += number;
            document.getElementById('expression').value = currentExpression;
        }
        
        function appendOperator(operator) {
            if (currentExpression === '' && lastResult !== '') {
                currentExpression = lastResult;
            }
            
            if (currentExpression !== '' && !isOperator(currentExpression.slice(-1))) {
                currentExpression += operator;
                document.getElementById('expression').value = currentExpression;
            }
        }
        
        function appendDecimal() {
            if (currentExpression === '' || isOperator(currentExpression.slice(-1))) {
                currentExpression += '0.';
            } else if (!hasDecimalInLastNumber(currentExpression)) {
                currentExpression += '.';
            }
            document.getElementById('expression').value = currentExpression;
        }
        
        function calculate() {
            if (currentExpression === '') return;
            
            try {
                const expressionToEval = currentExpression.replace(/×/g, '*');
                const result = eval(expressionToEval);
                
                if (isNaN(result) || !isFinite(result)) {
                    throw new Error('Недопустима операція');
                }
                
                lastResult = result.toString();
                document.getElementById('result').value = lastResult;
            } catch (error) {
                document.getElementById('result').value = 'Помилка';
            }
        }
        
        function clearAll() {
            currentExpression = '';
            lastResult = '';
            document.getElementById('expression').value = '';
            document.getElementById('result').value = '';
        }
        
        function isOperator(char) {
            return ['+', '-', '*', '/', '×'].includes(char);
        }
        
        function hasDecimalInLastNumber(expression) {
            const numbers = expression.split(/[\+\-\*\/×]/);
            const lastNumber = numbers[numbers.length - 1];
            return lastNumber.includes('.');
        }