<template>
<div>
    <el-row>
        <el-col :span="12" :offset="6">
            <h1 style="margin-bottom:0px">造价数据检索</h1>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="3" :offset="6" style="text-align:left">
            <h3 style="margin:10px 0px 0px 35px;">检索类别</h3>
        </el-col>
    </el-row>
    <el-row style="margin-top:5px" type="flex" justify="center" :gutter="10">
        <el-col :span="3" :offset="0">
            <el-select v-model="value" filterable placeholder="请选择检索类别" style="width:150px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="7" :offset="0">
            <el-autocomplete style="width:450px" v-model="search" :fetch-suggestions="querySearchAsync" @keyup.enter.native="searchHandler(true)" placeholder="输入工程名称关键词..." :trigger-on-focus="false" @select="handleSelect">
                <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler(true)"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="2" :offset="0">
            <el-button id="highSearch" @click="dialogVisible = true">高级检索</el-button>
        </el-col>

    </el-row>
    <el-row style="margin:10px 170px;padding:0px 10px">
        <el-col :span="4" style="text-align:left">
            <p v-if="!noData||filterFlags.includes(true)" style="font-size:14px;font-weight:bold;color:#088d53c8;font-style:oblique">About {{total}} results . . . </p>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-empty v-if="noData&&!filterFlags.includes(true)" description="暂无数据"></el-empty>
        <el-table v-if="!noData||filterFlags.includes(true)" :data="resultList" :header-cell-style="{'text-align':'center'}" :cell-style="{ textAlign: 'center' }" @sort-change="sortChange">
            <el-table-column prop="rname" label="建设项目" :index="0">
                <template slot="header" slot-scope="scope">
                    <i v-if="filterFlags[scope.column.index]&&!advancedSearchFlag" class="el-icon-wind-power"></i>
                    <el-tooltip :disabled="advancedSearchFlag" :content="filterFlags[scope.column.index]?'取消匹配过滤':'添加匹配过滤'" placement="top">
                        <span @click="filterSearch(scope.column.index)">{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-html='scope.row.rname'></p>
                </template>
            </el-table-column>
            <el-table-column prop="sname" label="单项工程" :index="1">
                <template slot="header" slot-scope="scope">
                    <i v-if="filterFlags[scope.column.index]&&!advancedSearchFlag" class="el-icon-wind-power"></i>
                    <el-tooltip :disabled="advancedSearchFlag" :content="filterFlags[scope.column.index]?'取消匹配过滤':'添加匹配过滤'" placement="top">
                        <span @click="filterSearch(scope.column.index)">{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-html='scope.row.sname'></p>
                </template>
            </el-table-column>
            <el-table-column prop="uname" label="单位工程" :index="2">
                <template slot="header" slot-scope="scope">
                    <i v-if="filterFlags[scope.column.index]&&!advancedSearchFlag" class="el-icon-wind-power"></i>
                    <el-tooltip :disabled="advancedSearchFlag" :content="filterFlags[scope.column.index]?'取消匹配过滤':'添加匹配过滤'" placement="top">
                        <span @click="filterSearch(scope.column.index)">{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-html='scope.row.uname'></p>
                </template>
            </el-table-column>
            <el-table-column prop="cname" label="小项" :index="3">
                <template slot="header" slot-scope="scope">
                    <i v-if="filterFlags[scope.column.index]&&!advancedSearchFlag" class="el-icon-wind-power"></i>
                    <el-tooltip :disabled="advancedSearchFlag" :content="filterFlags[scope.column.index]?'取消匹配过滤':'添加匹配过滤'" placement="top">
                        <span @click="filterSearch(scope.column.index)">{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-html='scope.row.cname'></p>
                </template> </el-table-column>
            <el-table-column prop="iname" label="条目" :index="4">
                <template slot="header" slot-scope="scope">
                    <i v-if="filterFlags[scope.column.index]&&!advancedSearchFlag" class="el-icon-wind-power"></i>
                    <el-tooltip :disabled="advancedSearchFlag" :content="filterFlags[scope.column.index]?'取消匹配过滤':'添加匹配过滤'" placement="top">
                        <span @click="filterSearch(scope.column.index)">{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-html='scope.row.iname'></p>
                </template>
            </el-table-column>
            <el-table-column prop="iprice" label="费用" sortable="custom">
                <template slot="header" slot-scope="scope">
                    <el-tooltip content="排序" placement="top">
                        <span>{{scope.column.label}}</span>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <p v-if="scope.row.iprice!=undefined ||scope.row.iprice===null">{{showIPrice(scope.row.iprice)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="rname" label="查看">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.rname!=undefined" @click="detailHandler(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <el-row v-if="!(noData&&currentPage===1)">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 50, 100]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-row>
    <el-backtop :bottom="100">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #0fee8d;
        }">
            Top
        </div>
    </el-backtop>
    <!-- 高级检索对话框 -->
    <el-dialog title="高级检索" :visible.sync="dialogVisible" width="50%">
        <el-row style="margin-top:5px" :gutter="20">
            <el-col :span="4">
                <el-select v-model="logicR">
                    <el-option v-for="item in logics" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="valueR">
                    <el-option v-for="item in fieldNames" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input v-model="inputR"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryModeR">
                    <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-top:5px" :gutter="20">
            <el-col :span="4">
                <el-select v-model="logicS">
                    <el-option v-for="item in logics" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="valueS">
                    <el-option v-for="item in fieldNames" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input v-model="inputS"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryModeS">
                    <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-top:5px" :gutter="20">
            <el-col :span="4">
                <el-select v-model="logicU">
                    <el-option v-for="item in logics" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="valueU">
                    <el-option v-for="item in fieldNames" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input v-model="inputU"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryModeU">
                    <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-top:5px" :gutter="20">
            <el-col :span="4">
                <el-select v-model="logicC">
                    <el-option v-for="item in logics" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="valueC">
                    <el-option v-for="item in fieldNames" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input v-model="inputC"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryModeC">
                    <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-top:5px" :gutter="20">
            <el-col :span="4">
                <el-select v-model="logicI">
                    <el-option v-for="item in logics" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="valueI">
                    <el-option v-for="item in fieldNames" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input v-model="inputI"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryModeI">
                    <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button id="advancedSearchConfirm" type="primary" @click="advancedSearchHandler(true)">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            noData: true,
            search: "", //当前输入框的值
            isFocus: false, //是否聚焦
            types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
            resultList: [{}],
            options: [{
                value: 'total_measure_tissue',
                label: '总价措施项目',
            }, {
                value: 'common_tissue,common_alter_tissue',
                label: '单价措施项目',
            }, {
                value: 'other_tissue',
                label: '其他项目',
            }, {
                value: 'tax_tissue',
                label: '规费、税金项目',
            }, {
                value: 'attached_tissue',
                label: '分部分项工程量',
            }, {
                value: 'main_material_sheet',
                label: '主要材料价格',
            }],
            value: 'total_measure_tissue',
            //过滤查询
            filterFlags: [false, false, false, false, false],
            Fields: ['rName', 'sName', 'uName', 'cName', 'iName'],
            filterFields: ['rName', 'sName', 'uName', 'cName', 'iName'],
            sortOrder: 'null',
            //分页
            currentPage: 1,
            pageSize: 15,
            total: 0,
            //高级检索
            dialogVisible: false,
            advancedSearchFlag: false,
            inputR: '',
            inputS: '',
            inputU: '',
            inputC: '',
            inputI: '',
            logics: [{
                value: 'must',
                label: '与',
            }, {
                value: 'should',
                label: '或',
            }, {
                value: 'must_not',
                label: '非',
            }],
            logicR: 'should',
            logicS: 'should',
            logicU: 'should',
            logicC: 'should',
            logicI: 'should',
            fieldNames: [{
                value: 'rName',
                label: '建设项目名称',
            }, {
                value: 'sName',
                label: '单项工程名称',
            }, {
                value: 'uName',
                label: '单位工程名称',
            }, {
                value: 'cName',
                label: '小项名称',
            }, {
                value: 'iName',
                label: '条目名称',
            }],
            valueR: 'rName',
            valueS: 'sName',
            valueU: 'uName',
            valueC: 'cName',
            valueI: 'iName',

            //查询方式
            modes: [{
                value: 'term',
                label: '精确',
            }, {
                value: 'match',
                label: '模糊'
            }],
            queryModeR: 'match',
            queryModeS: 'match',
            queryModeU: 'match',
            queryModeC: 'match',
            queryModeI: 'match',

            //自动补全
        };
    },
    mounted() {},
    methods: {
        //自动补全
        querySearchAsync(queryString, cb) {
            var params = {
                tName: this.value,
                content: this.search,
            }
            console.log('params :>> ', params);

            var results = [];
            this.$axios.get(
                    '/project/suggest', {
                        params
                    })
                .then(function (res) {
                    // console.log('res :>> ', res.data);
                    // results = res.data
                    //直接赋值 下拉补全提示不显示，必须这样赋值，玄学
                    res.data.forEach(ele => {
                        results.push({
                            value: ele.value
                        });
                    });
                })
                .catch(function (err) {
                    alert(err)
                })
            // console.log('results :>> ', results);

            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        handleSelect(item) {
            // console.log('search :>> ', this.search);
            // console.log('item :>> ', item);
        },
        //
        showIPrice(iprice) {
            return iprice === null ? '--' : (iprice.toFixed(2) + '元')
        },
        focus() {
            this.isFocus = true;
        },
        blur() {
            var self = this;
            this.searchBoxTimeout = setTimeout(function () {
                self.isFocus = false;
            }, 300);
        },
        searchHandler(fresh) {
            if (fresh === true) {
                this.resetCommonParams()
            }
            this.advancedSearchFlag = false
            let that = this
            var params = {
                tName: this.value,
                content: this.search,
                filterFields: this.filterFields + '',
                sortOrder: this.sortOrder,
                page: this.currentPage - 1,
                rows: this.pageSize
            }
            console.log('search :>> ', params);

            this.$axios.get(
                    '/project/search', {
                        params
                    })
                .then(function (res) {
                    if (res.data.dataList != null && res.data.dataList.length > 0) {
                        that.noData = false
                    } else {
                        that.noData = true
                    }
                    that.resultList = res.data.dataList
                    that.total = res.data.total

                    console.log('res :>> ', res.data);
                })
                .catch(function (err) {
                    alert(err)
                })
        },
        filterSearch(index) {

            if (!this.advancedSearchFlag) {
                //Vue双向绑定数组，改变时的写法，否则视图不更新
                this.$set(this.filterFlags, index, !this.filterFlags[index])
                this.filterFields = []
                var j = 0;
                for (let i = 0; i < this.filterFlags.length; i++) {
                    if (this.filterFlags[i]) {
                        this.filterFields[j] = this.Fields[i];
                        j++;
                    }
                }
                if (j === 0) {
                    this.filterFields = this.Fields;
                }
                this.searchHandler(false);
            }
        },
        sortChange(column) {
            this.sortOrder = column.order
            if (column.order === null) {
                this.sortOrder = 'null'
            }
            if (this.advancedSearchFlag) {
                this.advancedSearchHandler(false)
            } else {
                this.searchHandler(false)
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            if (this.advancedSearchFlag) {
                this.advancedSearchHandler(false)
            } else {
                this.searchHandler(false)
            }

        },
        handleCurrentChange(val) {
            this.currentPage = val
            if (this.advancedSearchFlag) {
                this.advancedSearchHandler(false)
            } else {
                this.searchHandler(false)
            }
        },
        // 高级检索
        advancedSearchHandler(fresh) {
            this.dialogVisible = false
            this.advancedSearchFlag = true

            if (fresh === true) {
                this.resetCommonParams()
            }

            let dslR = '{\"' + this.queryModeR + '\": {\"' + this.valueR + '\":\"' + this.inputR + '\"}}'
            let dslS = '{\"' + this.queryModeS + '\": {\"' + this.valueS + '\":\"' + this.inputS + '\"}}'
            let dslU = '{\"' + this.queryModeU + '\": {\"' + this.valueU + '\":\"' + this.inputU + '\"}}'
            let dslC = '{\"' + this.queryModeC + '\": {\"' + this.valueC + '\":\"' + this.inputC + '\"}}'
            let dslI = '{\"' + this.queryModeI + '\": {\"' + this.valueI + '\":\"' + this.inputI + '\"}}'
            let logicList = this.logicR + '#' + this.logicS + '#' + this.logicU + '#' + this.logicC + '#' + this.logicI
            let dslList = dslR + '#' + dslS + '#' + dslU + '#' + dslC + '#' + dslI

            var params = {
                tName: this.value,
                logic: logicList,
                dsl: dslList,
                sortOrder: this.sortOrder,
                page: this.currentPage - 1,
                rows: this.pageSize
            }
            // console.log('advancedSearch :>> ', params);

            let that = this
            this.$axios.get(
                    '/project/advanced', {
                        params
                    })
                .then(function (res) {
                    if (res.data.dataList != null && res.data.dataList.length > 0) {
                        that.noData = false
                    } else {
                        that.noData = true
                    }
                    that.resultList = res.data.dataList
                    that.total = res.data.total

                    // console.log('res :>> ', res.data);
                })
                .catch(function (err) {
                    alert(err)
                })

            // this.resetAdvancedSearchParams()

        },
        resetAdvancedSearchParams() {
            this.inputR = ''
            this.inputS = ''
            this.inputU = ''
            this.inputC = ''
            this.inputI = ''
            this.logicR = 'should'
            this.logicS = 'should'
            this.logicU = 'should'
            this.logicC = 'should'
            this.logicI = 'should'
            this.valueR = 'rName'
            this.valueS = 'sName'
            this.valueU = 'uName'
            this.valueC = 'cName'
            this.valueI = 'iName'
            this.queryModeR = 'match'
            this.queryModeS = 'match'
            this.queryModeU = 'match'
            this.queryModeC = 'match'
            this.queryModeI = 'match'
        },
        //每次新搜索fresh===true进行参数重置
        resetCommonParams() {
            this.currentPage = 1
            this.pageSize = 15
            this.total = 0
            this.sortOrder = 'null'

        },
        //查看详情
        detailHandler(row) {
            // console.log('row :>> ', row)
            let that = this
            //跳转
            let routeUrl = that.$router.resolve({
                path: '/detail',
                name: 'Detail',
                query: {
                    tName: this.value,
                    id: row.id
                }

            });
            window.open(routeUrl.href, '_blank');
            // var params = {
            //     tName: this.value,
            //     id: row.id
            // }
            // this.$axios.get(
            //         '/project/detail', {
            //             params
            //         })
            //     .then(function (res) {
            //         // console.log('detail :>> ', res);

            //     })
            //     .catch(function (err) {
            //         alert(err)
            //     })
        }
    },
};
</script>

<style>
.center {
    margin-top: 15px;
}

#search {
    background-color: #0fee8d;
    border-radius: 0%;
}

.search-title {
    color: #bdbaba;
    font-size: 15px;
    margin-bottom: 5px;
}

.about {
    width: 100%;
    height: 100%;
}

.el-table {
    margin: 5px 170px 0px 170px;
    width: 80%;
}

.el-table__cell {
    margin: 0 auto;
    padding: 0px 0px;
}

p {
    margin: 0 0 0 0;
    font-size: 13px;
}

.el-button:hover {
    border-color: #088d53c8;
    background: #0fee8d05;
    color: #0fee8d;
    font-weight: bold
}

#advancedSearchConfirm {
    background: #0fee8d;
    border-color: #0fee8d;

}

#advancedSearchConfirm:hover {
    color: white;

}
</style>
