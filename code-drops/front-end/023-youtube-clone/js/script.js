// YouTube Clone JavaScript 交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const menuButton = document.querySelector('.header-left .menu').parentElement;
    const sidebar = document.querySelector('.sidebar');
    const chipContent = document.querySelector('.chip-content');
    const videoSection = document.querySelector('.video');
    const previewCards = document.querySelectorAll('.preview-card');
    let overlay = null;
    
    // 侧边栏状态
    let sidebarExpanded = false;
    
    // 视频数据 - 为每个视频添加分类标签
    const videoData = [
        { id: 1, category: 'all', title: 'How I wake up at 3:14 am everyday | Train your Body Clock' },
        { id: 2, category: 'podcast', title: 'I\'m 54. If you\'re in your 30s or 40s watch this.' },
        { id: 3, category: 'music', title: 'I learned English to a C2 level, so you can just copy me' },
        { id: 4, category: 'game', title: 'How to become rich' },
        { id: 5, category: 'liver', title: 'The mindset shift that changed my 20s.' },
        { id: 6, category: 'animation', title: 'Emerging UX Roles You\'ve Never Heard Of' },
        { id: 7, category: 'visual-art', title: 'Healing Frequency Meditatio' }
    ];
    
    // 侧边栏展开/收起功能
    function openSidebar() {
        sidebarExpanded = true;
        sidebar.style.width = '240px';
        sidebar.style.transition = 'width 0.3s ease';
        sidebar.style.zIndex = 1002;
        
        // 显示logo头部
        const sidebarLogoHeader = document.querySelector('.sidebar-logo-header');
        if (sidebarLogoHeader) {
            sidebarLogoHeader.style.display = 'flex';
        }
        
        // 添加遮罩层
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay-mask';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeSidebar);
        }
        overlay.style.display = 'block';
        overlay.style.zIndex = 1001;
        
        // 锁定主内容交互
        videoSection.style.pointerEvents = 'none';
        chipContent.style.pointerEvents = 'none';
    }
    
    function closeSidebar() {
        sidebarExpanded = false;
        sidebar.style.width = '84px';
        sidebar.style.zIndex = '';
        
        // 隐藏logo头部
        const sidebarLogoHeader = document.querySelector('.sidebar-logo-header');
        if (sidebarLogoHeader) {
            sidebarLogoHeader.style.display = 'none';
        }
        
        // 移除遮罩层
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        // 恢复主内容交互
        videoSection.style.pointerEvents = '';
        chipContent.style.pointerEvents = '';
    }
    
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!sidebarExpanded) {
            openSidebar();
        } else {
            closeSidebar();
        }
    });
    
    // 视频筛选功能
    const filterButtons = chipContent.querySelectorAll('a');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有按钮的current类
            filterButtons.forEach(btn => btn.classList.remove('current'));
            
            // 为当前点击的按钮添加current类
            this.classList.add('current');
            
            // 获取筛选类别
            const filterCategory = this.textContent.toLowerCase();
            
            // 筛选视频（只隐藏不匹配的，显示的保持display为初始值）
            previewCards.forEach((card, index) => {
                const video = videoData[index];
                
                if (filterCategory === 'all' || video.category === filterCategory) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 响应式处理
    function handleResize() {
        if (window.innerWidth <= 791) {
            // 在小屏幕上隐藏侧边栏
            sidebar.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        } else {
            // 在大屏幕上显示侧边栏
            sidebar.style.display = 'flex';
            if (sidebarExpanded) {
                sidebar.style.width = '240px';
                if (overlay) overlay.style.display = 'block';
            } else {
                sidebar.style.width = '84px';
                if (overlay) overlay.style.display = 'none';
            }
        }
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 初始化响应式
    handleResize();
}); 