// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 轮播图功能
    const carouselSlides = document.querySelector('.vui_carousel__slides');
    const carouselItems = document.querySelectorAll('.vui_carousel__slide');
    const prevButton = document.querySelector('.carousel-prev-btn');
    const nextButton = document.querySelector('.carousel-next-btn');
    const dots = document.querySelectorAll('.carousel-dots-dot');
    const carouselFooterTitleSpan = document.querySelector('.carousel-footer-title span');
    const carouselFooterTitleLink = document.querySelector('.carousel-footer-title a');

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // 轮播图内容数据 (硬编码，对应轮播图图片和链接)
    const carouselData = [
        { title: "猎白狐误入石室，神秘人物现身", link: "#" },
        { title: "站庆游戏礼物派送中，先到先得！", link: "#" },
        { title: "领克双子星萌宠出道计划", link: "#" },
        { title: "庆祝怪盗基德生日，领无门槛好礼！", link: "#" },
        // ...更多轮播图数据
    ];

    function updateCarousel() {
        const offset = -currentIndex * 100; // 每个slide占据100%的宽度（相对于carouselSlides）
        carouselSlides.style.transform = `translateX(${offset / totalItems}%)`; // 计算正确的偏移百分比

        // 更新圆点指示器
        dots.forEach((dot, index) => {
            dot.classList.remove('is-active');
            if (index === currentIndex) {
                dot.classList.add('is-active');
            }
        });

        // 更新底部标题
        if (carouselData[currentIndex]) {
            carouselFooterTitleSpan.textContent = carouselData[currentIndex].title;
            carouselFooterTitleLink.href = carouselData[currentIndex].link;
        }
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // 自动播放 (可选)
    // let autoPlayInterval = setInterval(() => {
    //     currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    //     updateCarousel();
    // }, 5000); // 每5秒切换一次

    // // 鼠标悬停时停止自动播放
    // const recommendedSwipe = document.querySelector('.recommended-swipe');
    // recommendedSwipe.addEventListener('mouseenter', () => {
    //     clearInterval(autoPlayInterval);
    // });
    // recommendedSwipe.addEventListener('mouseleave', () => {
    //     autoPlayInterval = setInterval(() => {
    //         currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    //         updateCarousel();
    //     }, 5000);
    // });


    // 搜索框清除按钮显示/隐藏
    const searchInput = document.querySelector('.nav-search-input');
    const searchCleanBtn = document.querySelector('.nav-search-clean');
    const searchButton = document.querySelector('.nav-search-btn');

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            searchCleanBtn.style.visibility = 'visible';
        } else {
            searchCleanBtn.style.visibility = 'hidden';
        }
    });

    searchCleanBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchCleanBtn.style.visibility = 'hidden';
        searchInput.focus(); // 清除后让输入框重新获得焦点
    });

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止表单默认提交
        const query = searchInput.value.trim();
        if (query) {
            alert('搜索功能演示：您搜索了 "' + query + '"');
            // 实际中会跳转到搜索结果页
        } else {
            alert('请输入搜索内容！');
        }
    });

    // 更多频道链接展开/收起 (简化版，仅显示/隐藏)
    const moreChannelBtn = document.getElementById('channel-entry-more');
    const channelItemsLeft = document.querySelector('.channel-items__left');
    let isChannelExpanded = false;

    if (moreChannelBtn && channelItemsLeft) {
        // 初始只显示一部分，通过CSS控制
        // 为了演示展开/收起，我们假设一些元素默认是隐藏的
        const hiddenChannelLinks = Array.from(channelItemsLeft.children).slice(15); // 假设从第16个开始是隐藏的
        hiddenChannelLinks.forEach(link => link.style.display = 'none');

        moreChannelBtn.addEventListener('click', () => {
            isChannelExpanded = !isChannelExpanded;
            if (isChannelExpanded) {
                hiddenChannelLinks.forEach(link => link.style.display = 'block');
                moreChannelBtn.innerHTML = '收起 <svg width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="channel-entry-more__link--arrow"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.31899 5.59377C1.41662 5.6914 1.57491 5.6914 1.67255 5.59377L4.41244 2.85388L7.15232 5.59377C7.24996 5.6914 7.40825 5.6914 7.50588 5.59377C7.60351 5.49614 7.60351 5.33785 7.50588 5.24022L4.70706 2.0414C4.54434 1.87868 4.28053 1.87868 4.11781 2.0414L1.31899 5.24022C1.22136 5.33785 1.22136 5.49614 1.31899 5.59377Z" fill="currentColor"></path></svg>';
            } else {
                hiddenChannelLinks.forEach(link => link.style.display = 'none');
                moreChannelBtn.innerHTML = '更多 <svg width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="channel-entry-more__link--arrow"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z" fill="currentColor"></path></svg>';
            }
        });
    }

    // 初始化轮播图
    updateCarousel();
});