document.addEventListener('DOMContentLoaded', function() {
    // 折疊功能
    const containers = document.querySelectorAll('.collapsible-container');
    containers.forEach(container => {
        const header = container.querySelector('.collapsible-header');
        const content = container.querySelector('.collapsible-content');
        const toggleIcon = header.querySelector('.toggle-icon');

        // 默認展開所有列表
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px";
        toggleIcon.textContent = '▲';
        toggleIcon.classList.add('rotated');

        header.addEventListener('click', function() {
            content.classList.toggle('open');
            toggleIcon.classList.toggle('rotated');
            
            if (content.classList.contains('open')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });

    // 拖放功能
    const lists = document.querySelectorAll('[id^="sortable-list"]');
    lists.forEach(list => {
        let draggedItem = null;

        list.addEventListener('dragstart', function(e) {
            draggedItem = e.target;
            setTimeout(() => {
                e.target.style.opacity = '0.5';
                e.target.classList.add('dragging'); // 添加拖動中的類
            }, 0);
        });

        list.addEventListener('dragend', function(e) {
            setTimeout(() => {
                e.target.style.opacity = '';
                e.target.classList.remove('dragging'); // 移除拖動中的類
                draggedItem = null;
            }, 0);
        });

        list.addEventListener('dragover', function(e) {
            e.preventDefault();
            const afterElement = getDragAfterElement(list, e.clientY);
            const currentItem = draggedItem;
            if (afterElement == null) {
                list.appendChild(currentItem);
            } else {
                list.insertBefore(currentItem, afterElement);
            }
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.list-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 使標題可編輯
    const editableHeaders = document.querySelectorAll('.collapsible-header h2');
    editableHeaders.forEach(header => {
        header.addEventListener('focus', function() {
            // 當開始編輯時，暫時禁用折疊功能
            this.closest('.collapsible-header').style.pointerEvents = 'none';
        });

        header.addEventListener('blur', function() {
            // 當結束編輯時，重新啟用折疊功能
            this.closest('.collapsible-header').style.pointerEvents = '';
        });

        header.addEventListener('keydown', function(e) {
            // 按下 Enter 鍵時結束編輯
            if (e.key === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
});