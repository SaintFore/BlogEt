import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../services/api';
import './BlogEditor.css';

function BlogEditor() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!slug;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        summary: '',
        category: '',
        tags: [],
        status: 'draft'
    });

    const [categories, setCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // 加载分类和标签数据
    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const [categoriesRes, tagsRes] = await Promise.all([
                    apiService.getCategories(),
                    apiService.getTags()
                ]);

                console.log('Categories response:', categoriesRes);
                console.log('Tags response:', tagsRes);

                // 处理分类数据，确保它是数组
                if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
                    setCategories(categoriesRes.data);
                } else if (categoriesRes.data && Array.isArray(categoriesRes.data.results)) {
                    setCategories(categoriesRes.data.results);
                } else {
                    console.error('Unexpected categories data format:', categoriesRes.data);
                    setCategories([]);
                }

                // 处理标签数据，确保它是数组
                if (tagsRes.data && Array.isArray(tagsRes.data)) {
                    setAllTags(tagsRes.data);
                } else if (tagsRes.data && Array.isArray(tagsRes.data.results)) {
                    setAllTags(tagsRes.data.results);
                } else {
                    console.error('Unexpected tags data format:', tagsRes.data);
                    setAllTags([]);
                }
            } catch (err) {
                console.error('加载分类和标签失败', err);
                setError('加载分类和标签失败，请刷新重试');
                // 设置为空数组防止进一步的错误
                setCategories([]);
                setAllTags([]);
            }
        };

        fetchCategoriesAndTags();
    }, []);

    // 如果是编辑模式，加载文章数据
    useEffect(() => {
        if (isEditMode) {
            const fetchPost = async () => {
                try {
                    setInitialLoading(true);
                    const response = await apiService.getPost(slug);
                    const post = response.data;

                    setFormData({
                        title: post.title,
                        slug: post.slug,
                        content: post.content,
                        summary: post.summary || '',
                        category: post.category?.id || '',
                        tags: post.tags?.map(tag => tag.id) || [],
                        status: post.status
                    });

                } catch (err) {
                    console.error('加载文章失败', err);
                    setError('加载文章失败，请返回重试');
                } finally {
                    setInitialLoading(false);
                }
            };

            fetchPost();
        }
    }, [slug, isEditMode]);

    // 处理表单输入变化
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 处理富文本编辑器变化
    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    // 处理标题变化时自动生成slug
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            // 只有在slug字段未被手动修改过时才自动生成
            slug: prev.slug === '' || prev.slug === formData.title.toLowerCase().replace(/\s+/g, '-')
                ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                : prev.slug
        }));
    };

    // 处理标签选择
    const handleTagToggle = (tagId) => {
        setFormData(prev => {
            const isSelected = prev.tags.includes(tagId);
            if (isSelected) {
                return { ...prev, tags: prev.tags.filter(id => id !== tagId) };
            } else {
                return { ...prev, tags: [...prev.tags, tagId] };
            }
        });
    };

    // 提交表单
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            if (isEditMode) {
                await apiService.updatePost(slug, formData);
                setSuccessMessage('文章更新成功！');
            } else {
                const response = await apiService.createPost(formData);
                setSuccessMessage('文章创建成功！');
                // 创建成功后重定向到新文章页面
                setTimeout(() => {
                    navigate(`/blog/${response.data.slug}`);
                }, 1500);
            }
        } catch (err) {
            console.error('保存文章失败', err);
            const errorMessage = err.response?.data?.detail ||
                Object.values(err.response?.data || {}).flat().join(', ') ||
                '保存文章失败，请稍后再试';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div className="loading">正在加载文章数据...</div>;
    }

    return (
        <div className="blog-editor-page">
            <div className="container">
                <div className="editor-header">
                    <h1>{isEditMode ? '编辑文章' : '创建新文章'}</h1>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="editor-form">
                    <div className="form-row">
                        <div className="form-group col-md-8">
                            <label htmlFor="title">文章标题 *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="slug">URL别名 *</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                                pattern="[a-z0-9-]+"
                                title="只能包含小写字母、数字和连字符"
                            />
                            <small className="form-text text-muted">将用于URL，例如: /blog/your-slug</small>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="summary">文章摘要</label>
                        <textarea
                            id="summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleInputChange}
                            className="form-control"
                            rows="3"
                            placeholder="简短描述文章内容（可选）"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">文章内容 *</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="form-control editor-textarea"
                            rows="15"
                            required
                        ></textarea>
                        {/* 在实际应用中，可以替换为富文本编辑器，如React Quill, TinyMCE等 */}
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="category">分类 *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="">选择分类...</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="status">状态</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="draft">草稿</option>
                                <option value="published">已发布</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>标签</label>
                        <div className="tags-selector">
                            {allTags.map(tag => (
                                <div key={tag.id} className="tag-item">
                                    <input
                                        type="checkbox"
                                        id={`tag-${tag.id}`}
                                        checked={formData.tags.includes(tag.id)}
                                        onChange={() => handleTagToggle(tag.id)}
                                    />
                                    <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? '保存中...' : isEditMode ? '更新文章' : '发布文章'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BlogEditor;