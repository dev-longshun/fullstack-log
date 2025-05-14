const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const booksContainer = document.getElementById('books-container');
const loader = document.getElementById('loader');

// Google Books API URL
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// 显示加载动画
const showLoader = () => {
    loader.style.display = 'flex';
    booksContainer.innerHTML = '';
};

// 隐藏加载动画
const hideLoader = () => {
    loader.style.display = 'none';
};

// 格式化日期
const formatDate = (dateString) => {
    if (!dateString) return '暂无日期信息';
    const date = new Date(dateString);
    return date.getFullYear();
};

// 创建图书卡片
const createBookCard = (book) => {
    const {
        volumeInfo: {
            title,
            authors = ['未知作者'],
            publishedDate,
            imageLinks = {},
            infoLink
        }
    } = book;

    const card = document.createElement('div');
    card.className = 'book-card';

    const imageUrl = imageLinks.thumbnail || 'https://via.placeholder.com/128x190?text=无封面';

    card.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="book-image">
        <div class="book-info">
            <h3 class="book-title">${title}</h3>
            <p class="book-author">${authors.join(', ')}</p>
            <p class="book-date">出版年份：${formatDate(publishedDate)}</p>
            <a href="${infoLink}" target="_blank" class="book-link">了解更多</a>
        </div>
    `;

    return card;
};

// 搜索图书
const searchBooks = async (query) => {
    try {
        showLoader();
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&maxResults=40`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            data.items.forEach(book => {
                const bookCard = createBookCard(book);
                booksContainer.appendChild(bookCard);
            });
        } else {
            booksContainer.innerHTML = '<p style="text-align: center; width: 100%;">未找到相关图书</p>';
        }
    } catch (error) {
        console.error('搜索出错：', error);
        booksContainer.innerHTML = '<p style="text-align: center; width: 100%;">搜索时出现错误，请稍后重试</p>';
    } finally {
        hideLoader();
    }
};

// 处理表单提交
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchBooks(query);
    }
}); 