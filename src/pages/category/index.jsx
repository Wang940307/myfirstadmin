import React,{Component} from "react";
import {Card, Button, Table, Modal, message, Icon} from 'antd';
import MyButton from '../../components/my-button';
import { reqCategories, reqAddCategory,reqUpdateCategoryName,reqCategoriesInfo} from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name';
import "./index.less";
class Category extends Component{
    state = {
        categories: [], // 一级分类列表
        subCategories: [], // 二级分类列表
        isShowSubCategories: false, // 是否显示二级分类列表
        isShowAddCategory: false, // 显示添加品类
        isShowUpdateCategoryName:false,
        loading: true
    };
    category = {};

    async componentDidMount() {
        const result = await reqCategories('0');
        if (result) {
            this.setState({categories: result});
        }
    }
    showAddCategory = () => {
        console.log("showAddCategory");
        this.setState({
            isShowAddCategory: true
        })
    };
    hideAddCategory = () => {
        this.setState({
            isShowAddCategory: false
        })
    };
    addCategory = () => {
        // 1. 表单校验
        // 2. 收集表单数据
        // console.log(this.addCategoryForm);
        console.log("addCategory");
        const { form } = this.addCategoryForm.props;


        form.validateFields(async (err, values) => {
            if (!err) {
                // 校验通过
                console.log(values);
                const { parentId, categoryName } = values;
                console.log(parentId,categoryName);
                const result = await reqAddCategory(parentId, categoryName);
                console.log(result);
                if (result) {

                    // 添加分类成功~
                    message.success('添加分类成功~', 2);
                    // 清空表单数据
                    form.resetFields(['parentId', 'categoryName']);

                    /*
                      如果是一级分类：就在一级分类列表中展示
                      如果是二级分类：就在二级分类中展示，而一级分类是不需要的
                     */

                    const options = {
                        isShowAddCategory: false
                    };

                    const { isShowSubCategories } = this.state;

                    if (result.parentId === '0') {
                        options.categories = [...this.state.categories, result];
                    } else if (isShowSubCategories && result.parentId === this.parentCategory._id) {
                        options.subCategories = [...this.state.subCategories, result];
                        console.log(this.state.subCategories);
                    }

                    // 统一更新
                    this.setState(options);

                }
            }
        })
        // 3. 发送请求
    };
    saveCategory = (category) => {
        return () => {
            this.category = category;
            console.log(this);
            this.setState({
                isShowUpdateCategoryName: true
            })
        }
    };
    updateCategoryName = () => {
        const { form } = this.updateCategoryNameForm.props;
        // 校验表单，收集数据
        form.validateFields(async (err, values) => {
            if (!err) {
                const { categoryName } = values;
                const categoryId = this.category._id;
                // 发送请求
                const result = await reqUpdateCategoryName(categoryId, categoryName);
                console.log(result);
                if (result) {
                    const { parentId } = this.category;
                    console.log(this.category);
                    let categoryData = this.state.categories;
                    let stateName = 'categories';
                    if (parentId !== '0') {
                        // console.log(111);
                        // 二级分类
                        categoryData = this.state.subCategories;
                        stateName = 'subCategories';
                    }
                    // 不想修改原数据
                    const categories = categoryData.map((category) => {
                        let { _id, name, parentId } = category;

                        // 找到对应id的category，修改分类名称
                        if (_id === categoryId) {
                            name = categoryName;
                            return {
                                _id,
                                name,
                                parentId
                            }
                        }
                        // 没有修改的数据直接返回
                        return category
                    });

                    // 清空表单项的值 隐藏对话框
                    form.resetFields(['categoryName']);

                    message.success('更新分类名称成功~', 2);

                    this.setState({
                        isShowUpdateCategoryName: false,
                        [stateName]: categories
                    });
                }
            }
        })

    };

    hideUpdateCategoryName = ()=>{
        this.setState({
            isShowUpdateCategoryName: false
        })
    };
    fetchCategories = async (parentId) => {
        this.setState({
            loading: true
        });
        console.log(parentId);
        const result = await reqCategories(parentId);
        console.log(result);
        if (result) {
            if (parentId === '0') {
                this.setState({categories: result});
            } else {
                this.setState({
                    subCategories: result,
                    isShowSubCategories: true
                });
            }
        }

        this.setState({
            loading: false
        })

    };
    goBack = () => {
        this.setState({
            isShowSubCategories: false
        })
    };
    showSubCategory = (category) => {
        return async () => {
            // 请求二级分类数据
            this.parentCategory = category;
            this.fetchCategories(category._id);
        }
    };
    render(){
        const {
            categories,
            subCategories,
            isShowSubCategories,
            isShowAddCategory,
            isShowUpdateCategoryName,
            loading
        } = this.state;
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                className: 'category-operation',
                render: category => {
                    return <div>
                        <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
                        {this.state.isShowSubCategories ? null : <MyButton onClick={this.showSubCategory(category)}>查看其子品类</MyButton>}
                    </div>
                }
            },

        ];

        return(
            <div>
                <Card title={ isShowSubCategories ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div> : "一级分类列表" } extra={<Button type="primary" onClick={this.showAddCategory}>添加品类</Button> } style={{ width: "100%" }}>
                    <Table
                        columns={columns}
                        dataSource={isShowSubCategories ?subCategories:categories }
                        bordered
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: ['3', '6', '9', '12'],
                            defaultPageSize: 3,
                            showQuickJumper: true
                        }}
                    />

                    <Modal
                        title="添加分类"
                        visible={isShowAddCategory}
                        onOk={this.addCategory}
                        onCancel={this.hideAddCategory}
                        okText="确认"
                        cancelText="取消"
                    >
                        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
                    </Modal>
                    <Modal
                        title="修改名称"
                        visible={this.state.isShowUpdateCategoryName}
                        onOk={this.updateCategoryName}
                        onCancel={this.hideUpdateCategoryName}
                        okText="确认"
                        cancelText="取消"
                        width={250}
                    >
                        <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
export default Category;