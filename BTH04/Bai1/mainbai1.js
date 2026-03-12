let students = [];
let filteredStudents = [];
let nextId = 1;

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const txtSearch = document.getElementById('txtSearch');
const selectRankFilter = document.getElementById('selectRankFilter');
const thScore = document.getElementById('thScore');
const scoreSortIndicator = document.getElementById('scoreSortIndicator');
const studentTableBody = document.getElementById('studentTableBody');
const summaryInfo = document.getElementById('summaryInfo');

const state = {
    sortDirection: null, // 'asc' | 'desc' | null
};

function getRank(score) {
    if (score >= 8.5) {
        return "Giỏi";
    } else if (score >= 7.0) {
        return "Khá";
    } else if (score >= 5.0) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

function isValidScore(value) {
    const score = parseFloat(value);
    return !Number.isNaN(score) && Number.isFinite(score) && score >= 0 && score <= 10;
}

function updateSummary() {
    const total = filteredStudents.length;
    const average = total === 0 ? 0 : filteredStudents.reduce((sum, s) => sum + s.score, 0) / total;
    summaryInfo.textContent = `Tổng số sinh viên: ${total} | Điểm trung bình: ${average.toFixed(2)}`;
}

function updateSortIndicator() {
    if (state.sortDirection === 'asc') {
        scoreSortIndicator.textContent = '▲';
    } else if (state.sortDirection === 'desc') {
        scoreSortIndicator.textContent = '▼';
    } else {
        scoreSortIndicator.textContent = '';
    }
}

function renderTable() {
    studentTableBody.innerHTML = '';

    if (filteredStudents.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 16px;">
                Không có kết quả
            </td>
        `;
        studentTableBody.appendChild(emptyRow);
        updateSummary();
        return;
    }

    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        if (student.score < 5) {
            row.style.backgroundColor = 'yellow';
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.rank}</td>
            <td>
                <button type="button" class="delete-btn" data-id="${student.id}">Xóa</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

    updateSummary();
}

function applyFilters() {
    const searchKeyword = txtSearch.value.trim().toLowerCase();
    const rankFilter = selectRankFilter.value;

    filteredStudents = students.filter((student) => {
        const matchesSearch = !searchKeyword || student.name.toLowerCase().includes(searchKeyword);
        const matchesRank = rankFilter === 'all' || student.rank === rankFilter;
        return matchesSearch && matchesRank;
    });

    if (state.sortDirection) {
        filteredStudents.sort((a, b) => {
            return state.sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable();
}

function addStudent() {
    const name = txtName.value.trim();
    const scoreValue = txtScore.value.trim();

    if (!name) {
        alert('Họ tên không được để trống');
        txtName.focus();
        return;
    }

    if (!isValidScore(scoreValue)) {
        alert('Điểm phải là số từ 0 đến 10');
        txtScore.focus();
        return;
    }

    const score = parseFloat(scoreValue);
    const rank = getRank(score);

    students.push({ id: nextId++, name, score, rank });

    applyFilters();

    txtName.value = '';
    txtScore.value = '';
    txtName.focus();
}

function deleteStudentById(id) {
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        applyFilters();
    }
}

btnAdd.addEventListener('click', () => addStudent());

txtScore.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addStudent();
    }
});

txtSearch.addEventListener('input', () => applyFilters());
selectRankFilter.addEventListener('change', () => applyFilters());

thScore.addEventListener('click', () => {
    state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    updateSortIndicator();
    applyFilters();
});

studentTableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('button.delete-btn')) {
        const id = Number(target.dataset.id);
        if (!Number.isNaN(id)) {
            deleteStudentById(id);
        }
    }
});

// Initial render
applyFilters();
