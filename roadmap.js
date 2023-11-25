function toggleItem(itemId) {
    var item = document.getElementById(itemId);

    if (item.classList.contains('checked')) {
        item.classList.remove('checked');
    } else {
        item.classList.add('checked');
    }

    // Simpan status pembelajaran di local storage
    saveLearningStatus();
}

function markAllLearned(levelId) {
    var level = document.getElementById(levelId);
    var items = level.querySelectorAll('li');

    items.forEach(function (item) {
        item.classList.add('checked');
    });

    // Simpan status pembelajaran di local storage
    saveLearningStatus();
}

function saveLearningStatus() {
    // Mengambil status pembelajaran dari setiap item
    var levels = document.querySelectorAll('.level');
    var learningStatus = {};

    levels.forEach(function (level) {
        var levelId = level.id;
        var items = level.querySelectorAll('li');
        learningStatus[levelId] = {};

        items.forEach(function (item) {
            var itemId = item.id;
            var learned = item.classList.contains('checked');
            learningStatus[levelId][itemId] = learned;
        });
    });

    // Simpan status pembelajaran di local storage
    localStorage.setItem('learningStatus', JSON.stringify(learningStatus));
}

// Memulihkan status pembelajaran dari local storage saat halaman dimuat
function restoreLearningStatus() {
    var learningStatus = localStorage.getItem('learningStatus');

    if (learningStatus) {
        learningStatus = JSON.parse(learningStatus);

        for (var levelId in learningStatus) {
            var items = learningStatus[levelId];

            for (var itemId in items) {
                if (items[itemId]) {
                    var item = document.getElementById(itemId);
                    item.classList.add('checked');
                }
            }
        }
    }
}

// Memanggil fungsi untuk memulihkan status pembelajaran saat halaman dimuat
restoreLearningStatus();
