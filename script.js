const checkBoxlist = document.querySelectorAll('.checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const progressLabel = document.querySelector('.progress-label');

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
];

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

function updateProgressBar(goals) {
    const completedGoalsCount = Object.values(goals).filter(goal => goal.completed).length;
    progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
    progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
}

document.addEventListener('DOMContentLoaded', () => {
    allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
    updateProgressBar(allGoals);

    inputFields.forEach((input) => {
        if (allGoals[input.id]) {
            input.value = allGoals[input.id].name;
            if (allGoals[input.id].completed) {
                input.parentElement.classList.add('completed');
            }
        }
    });
});

window.addEventListener('storage', (event) => {
    if (event.key === 'allGoals') {
        const updatedGoals = JSON.parse(event.newValue);
        allGoals = updatedGoals;
        updateProgressBar(updatedGoals);

        inputFields.forEach((input) => {
            if (allGoals[input.id]) {
                input.value = allGoals[input.id].name;
                if (allGoals[input.id].completed) {
                    input.parentElement.classList.add('completed');
                } else {
                    input.parentElement.classList.remove('completed');
                }
            }
        });
    }
});

checkBoxlist.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allFieldsFilled = [...inputFields].every(input => input.value);
        if (allFieldsFilled) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            updateProgressBar(allGoals);

            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        } else {
            progressBar.classList.add('show-error');
        }
    });
});

inputFields.forEach((input) => {
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error');
    });

    input.addEventListener('input', (e) => {
        if (allGoals[input.id]?.completed) {
            input.value = allGoals[input.id].name;
            return;
        }

        allGoals[input.id] = {
            name: input.value,
            completed: false,
        };
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
});
