<template>
<div style="margin-left:15px">
    <el-row>
        <el-col class="info" :span="7" :offset="0">
            <el-row style="margin:10px 0px 10px 0px;" :gutter="0">
                <el-col :span="8" style="text-align:left" type="flex" align="middle">
                    <h3 style="margin:0px 0px">详细信息</h3>
                </el-col>
                <el-col :span="16" style="text-align:right">
                    <el-button size="small" id="displayButton" @click="draw();handleClick($event)">项目结构总览</el-button>
                </el-col>
            </el-row>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-if="info.rname!=null" :title="'建设项目：'+info.rname" name="1">
                </el-collapse-item>
                <el-collapse-item v-if="info.sname!=null" :title="'单项工程：'+info.sname" name="2">
                </el-collapse-item>
                <el-collapse-item v-if="info.uname!=null" :title="'单位工程：'+info.uname" name="3">
                </el-collapse-item>
                <el-collapse-item v-if="info.tname!=null" :title="'检索类别：'+info.tname" name="4">
                    <div class="infoAttr" v-if="info.tfixedLaborCost!=null">>定额人工费：{{info.tfixedLaborCost}}元</div>
                    <div class="infoAttr" v-if="info.tprovisionalEstimate!=null">>暂估价：{{info.tprovisionalEstimate}}元</div>
                    <div class="infoAttr" v-if="info.tcombinedPrice!=null">>合价：{{info.tcombinedPrice}}元</div>
                    <div class="infoAttr" v-if="info.tcomprehensiveCombinedPricePreTax!=null">>综合合价（税前）：{{info.tcomprehensiveCombinedPricePreTax}}元</div>
                    <div class="infoAttr" v-if="info.tcomprehensiveCombinedPriceIncludedTax!=null">>综合合价（含税）：{{info.tcomprehensiveCombinedPriceIncludedTax}}元</div>
                    <div class="infoAttr" v-if="info.tsummation!=null">>合计：{{info.tsummation}}元</div>
                </el-collapse-item>
                <el-collapse-item v-if="info.cname!=null" :title="'小项：'+info.cname" name="5">
                    <div class="infoAttr" v-if="info.ccode!=null">>项目编码：{{info.ccode}}</div>
                    <div class="infoAttr" v-if="info.ccalculationBasis!=null">>计算基础：{{info.ccalculationBasis}}</div>
                    <div class="infoAttr" v-if="info.ccalculationCardinality!=null">>计算基数：{{info.ccalculationCardinality}}</div>
                    <div class="infoAttr" v-if="info.ccalculationRate!=null">>计算费率：{{info.ccalculationRate}}%</div>
                    <div class="infoAttr" v-if="info.cfixedLaborCost!=null">>定额人工费：{{info.cfixedLaborCost}}元</div>
                    <div class="infoAttr" v-if="info.cprovisionalEstimate!=null">>暂估价：{{info.cprovisionalEstimate}}元</div>
                    <div class="infoAttr" v-if="info.ccombinedPrice!=null">>合价：{{info.ccombinedPrice}}元</div>
                    <div class="infoAttr" v-if="info.ccomprehensiveCombinedPricePreTax!=null">>综合合价（税前）：{{info.ccomprehensiveCombinedPricePreTax}}元</div>
                    <div class="infoAttr" v-if="info.ccomprehensiveCombinedPriceIncludedTax!=null">>综合合价（含税）：{{info.ccomprehensiveCombinedPriceIncludedTax}}元</div>
                    <div class="infoAttr" v-if="info.csettlementAmount!=null">>结算金额：{{info.csettlementAmount}}元</div>
                    <div class="infoAttr" v-if="info.camount!=null">>金额：{{info.camount}}元</div>
                    <div class="infoAttr" v-if="info.cremark!=null">>备注：{{info.cremark}}</div>
                </el-collapse-item>
                <el-collapse-item v-if="info.iname!=null" :title="'条目：'+info.iname" name="6">
                    <div class="infoAttr" v-if="info.icode!=null">>编码：{{info.icode}}</div>
                    <div class="infoAttr" v-if="info.iauxiliaryMaterialCost!=null">>辅材费：{{info.iauxiliaryMaterialCost}}元</div>
                    <div class="infoAttr" v-if="info.icalculationBasis!=null">>计算基础：{{info.icalculationBasis}}</div>
                    <div class="infoAttr" v-if="info.icalculationCardinality!=null">>计算基数：{{info.icalculationCardinality}}</div>
                    <div class="infoAttr" v-if="info.icalculationRate!=null">>计算费率：{{info.icalculationRate}}%</div>
                    <div class="infoAttr" v-if="info.iadjustmentRate!=null">>调整费率：{{info.iadjustmentRate}}%</div>
                    <div class="infoAttr" v-if="info.iadjustedAmount!=null">>调整后金额：{{info.iadjustedAmount}}元</div>
                    <div class="infoAttr" v-if="info.icomprehensiveUnitPrice!=null">>综合单价：{{info.icomprehensiveUnitPrice}}元</div>
                    <div class="infoAttr" v-if="info.icomprehensiveUnitPricePreTax!=null">>综合单价（税前）：{{info.icomprehensiveUnitPricePreTax}}元</div>
                    <div class="infoAttr" v-if="info.icomprehensiveUnitPriceIncludedTax!=null">>综合单价（含税）：{{info.icomprehensiveUnitPriceIncludedTax}}元</div>
                    <div class="infoAttr" v-if="info.icomprehensiveCombinedPricePreTax!=null">>综合合价（税前）：{{info.icomprehensiveCombinedPricePreTax}}元</div>
                    <div class="infoAttr" v-if="info.iprice!=null">>综合合价（含税）：{{info.iprice}}元</div>
                    <div class="infoAttr" v-if="info.ifeature!=null">>项目特征：{{info.ifeature}}</div>
                    <div class="infoAttr" v-if="info.ifeatureDescription!=null">>项目特征描述：{{info.ifeatureDescription}}</div>
                    <div class="infoAttr" v-if="info.ijobContent!=null">>工作内容：{{info.ijobContent}}</div>
                    <div class="infoAttr" v-if="info.iunit!=null">>单位：{{info.iunit}}</div>
                    <div class="infoAttr" v-if="info.idescription!=null">>描述：{{info.idescription}}</div>
                    <div class="infoAttr" v-if="info.iquantity!=null">>工程量：{{info.iquantity}}</div>
                    <div class="infoAttr" v-if="info.iquotationUnit!=null">>报价单位：{{info.iquotationUnit}}</div>
                    <div class="infoAttr" v-if="info.isupplyWay!=null">>供材方式：{{info.isupplyWay}}</div>
                    <div class="infoAttr" v-if="info.ilaborCost!=null">>人工费：{{info.ilaborCost}}元</div>
                    <div class="infoAttr" v-if="info.ifixedLaborCost!=null">>定额人工费：{{info.ifixedLaborCost}}元</div>
                    <div class="infoAttr" v-if="info.ispecifiedCost!=null">>规费：{{info.ispecifiedCost}}元</div>
                    <div class="infoAttr" v-if="info.imachiningCost!=null">>机械费：{{info.imachiningCost}}元</div>
                    <div class="infoAttr" v-if="info.imainMaterialCost!=null">>主材费：{{info.imainMaterialCost}}元</div>
                    <div class="infoAttr" v-if="info.imainMaterialDepletion!=null">>主材损耗：{{info.imainMaterialDepletion}}元</div>
                    <div class="infoAttr" v-if="info.imainMaterialUnitPrice!=null">>主材单价：{{info.imainMaterialUnitPrice}}元</div>
                    <div class="infoAttr" v-if="info.imeasurementRule!=null">>计量规则：{{info.imeasurementRule}}</div>
                    <div class="infoAttr" v-if="info.imeasurementUnit!=null">>计量单位：{{info.imeasurementUnit}}</div>
                    <div class="infoAttr" v-if="info.imanagementCost!=null">>管理费：{{info.imanagementCost}}元</div>
                    <div class="infoAttr" v-if="info.itax!=null">>税金：{{info.itax}}元</div>
                    <div class="infoAttr" v-if="info.irate!=null">>费率：{{info.irate}}%</div>
                    <div class="infoAttr" v-if="info.iprofit!=null">>利润：{{info.iprofit}}元</div>
                    <div class="infoAttr" v-if="info.iprovisionalEstimate!=null">>暂估价：{{info.iprovisionalEstimate}}元</div>
                    <div class="infoAttr" v-if="info.isettlementAmount!=null">>结算金额：{{info.isettlementAmount}}元</div>
                    <div class="infoAttr" v-if="info.iremark!=null">>备注：{{info.iremark}}</div>
                </el-collapse-item>
            </el-collapse>

        </el-col>
        <el-col class="visual" :span="17" :offset="0">
            <h3 style="margin:10px 0px 10px 0px;">可视化
            </h3>
            <div id="echartsBox"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import greenTheme from '../config/greenTheme'
export default {
    name: 'Detail',
    data() {
        return {
            info: {},
            activeNames: ['6'],
            rotateAngle: -40
        }
    },
    created() {
        // console.log('query :>> ', this.$route.query);
        var params = this.$route.query
        let that = this
        this.$axios.get(
                '/project/detail', {
                    params
                })
            .then(function (res) {
                that.info = res.data.data
                // console.log('detail :>> ', that.info);

            })
            .catch(function (err) {
                alert(err)
            })

    },
    mounted() {
        setTimeout(() => {
            this.draw();
        }, 200)

    },
    methods: {
        handleClick(e) {
            let target = e.target;
            if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
                target = e.target.parentNode;
            }
            target.blur();
        },

        handleChange(val) {
            // console.log(val[val.length - 1]);
            switch (val[val.length - 1]) {
                case '1':
                    this.drawR()
                    break;
                case '2':
                    this.drawS()
                    break;
                case '3':
                    this.drawU()
                    break;
                    // case '4':
                    //     this.drawT()
                    //     break;
                default:
                    this.draw()
            }
        },
        matchName(name, tname) {
            if (name != null && tname != null) {
                return name.substring(0, 2) === tname.substring(0, 2)
            }
            return false
        },
        draw() {
            this.$echarts.dispose(document.getElementById('echartsBox'))
            this.$echarts.registerTheme('greenTheme', greenTheme);
            var chartDom = document.getElementById('echartsBox');
            var myChart = this.$echarts.init(chartDom, greenTheme);
            var option;

            myChart.showLoading();
            var params = {
                rName: this.info.rname
            }
            var that = this
            this.$axios.get('/project/tree', {
                    params
                }).then(function (data) {
                    myChart.hideLoading();
                    // console.log('data :>> ', data);
                    if (data.data != '') {
                        data.data.children.forEach(function (datum, index) {
                            datum.name != that.info.sname && (datum.collapsed = true);
                        });
                    }

                    myChart.setOption(
                        (option = {
                            tooltip: {
                                trigger: 'item',
                                triggerOn: 'mousemove'
                            },
                            series: [{
                                type: 'tree',
                                data: [data.data],
                                top: '1%',
                                left: '7%',
                                bottom: '1%',
                                right: '20%',
                                symbolSize: 7,
                                // orient: 'RL',
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left',
                                    fontSize: 9
                                },
                                leaves: {
                                    label: {
                                        position: 'left',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                },
                                emphasis: {
                                    focus: 'descendant'
                                },
                                expandAndCollapse: true,
                                animationDuration: 550,
                                animationDurationUpdate: 750
                            }]
                        })
                    );
                })
                .catch(function (err) {
                    alert(err)
                });
            option && myChart.setOption(option);
        },
        drawR() {
            this.$echarts.dispose(document.getElementById('echartsBox'))
            this.$echarts.registerTheme('greenTheme', greenTheme);
            var chartDom = document.getElementById('echartsBox');
            var myChart = this.$echarts.init(chartDom, 'greenTheme');
            var option;

            myChart.showLoading();
            var params = {
                rName: this.info.rname
            }
            var that = this
            this.$axios.get('/project/rTable', {
                    params
                }).then(function (data) {
                    myChart.hideLoading();
                    // console.log('data :>> ', data);
                    myChart.setOption(
                        (option = {
                            xAxis: {
                                type: 'category',
                                data: data.data.xList,
                                axisLabel: {
                                    interval: 0,
                                    rotate: that.rotateAngle
                                }
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: data.data.vList,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                itemStyle: {
                                    color: function (params) {
                                        // console.log('params :>> ', params.name);
                                        if (params.name === that.info.sname) {
                                            return '#0fee8d';
                                        }
                                        return '#4ea397'
                                    }
                                }
                            }],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                        })
                    );
                })
                .catch(function (err) {
                    alert(err)
                });
            option && myChart.setOption(option);
        },
        drawS() {
            this.$echarts.dispose(document.getElementById('echartsBox'))
            this.$echarts.registerTheme('greenTheme', greenTheme);
            var chartDom = document.getElementById('echartsBox');
            var myChart = this.$echarts.init(chartDom, 'greenTheme');
            var option;

            myChart.showLoading();
            var params = {
                rName: this.info.rname,
                sName: this.info.sname

            }
            var that = this
            this.$axios.get('/project/sTable', {
                    params
                }).then(function (data) {
                    myChart.hideLoading();
                    // console.log('data :>> ', data);
                    myChart.setOption(
                        (option = {
                            xAxis: {
                                type: 'category',
                                data: data.data.xList,
                                axisLabel: {
                                    interval: 0,
                                    rotate: that.rotateAngle
                                }
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: data.data.vList,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                itemStyle: {
                                    color: function (params) {
                                        if (params.name === that.info.uname) {
                                            return '#0fee8d';
                                        }
                                        return '#4ea397'
                                    }
                                }
                            }],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                        })
                    );
                })
                .catch(function (err) {
                    alert(err)
                });
            option && myChart.setOption(option);
        },
        drawU() {
            this.$echarts.dispose(document.getElementById('echartsBox'))
            this.$echarts.registerTheme('greenTheme', greenTheme);
            var chartDom = document.getElementById('echartsBox');
            var myChart = this.$echarts.init(chartDom, 'greenTheme');
            var option;

            myChart.showLoading();
            var params = {
                rName: this.info.rname,
                sName: this.info.sname,
                uName: this.info.uname

            }
            var that = this
            this.$axios.get('/project/uTable', {
                    params
                }).then(function (data) {
                    myChart.hideLoading();
                    // console.log('data :>> ', data);
                    myChart.setOption(
                        (option = {
                            xAxis: {
                                type: 'category',
                                data: data.data.xList,
                                axisLabel: {
                                    interval: 0,
                                    rotate: that.rotateAngle
                                }
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: data.data.vList,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)'
                                },
                                itemStyle: {
                                    color: function (params) {
                                        if (that.matchName(params.name, that.info.tname)) {
                                            return '#0fee8d';
                                        }
                                        return '#4ea397'
                                    }
                                }
                            }],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                        })
                    );
                })
                .catch(function (err) {
                    alert(err)
                });
            option && myChart.setOption(option);
        },
        // drawT() {
        //     this.$echarts.dispose(document.getElementById('echartsBox'))
        //     this.$echarts.registerTheme('greenTheme', greenTheme);
        //     var chartDom = document.getElementById('echartsBox');
        //     var myChart = this.$echarts.init(chartDom, 'greenTheme');
        //     var option;

        //     myChart.showLoading();
        //     var params = {
        //         rName: this.info.rname,
        //         sName: this.info.sname,
        //         uName: this.info.uname,
        //         tName: this.info.tname.substring(0, 2) + '%'

        //     }
        //     console.log('paramstTable :>> ', params);
        //     var that = this
        //     this.$axios.get('/project/tTable', {
        //             params
        //         }).then(function (data) {
        //             myChart.hideLoading();
        //             console.log('data :>> ', data);
        //             if (data.data.xList.length === 0) {
        //                 that.draw()
        //             } else {
        //                 myChart.setOption(
        //                     (option = {
        //                         xAxis: {
        //                             type: 'category',
        //                             data: data.data.xList,
        //                             axisLabel: {
        //                                 interval: 0,
        //                                 rotate: that.rotateAngle
        //                             }
        //                         },
        //                         yAxis: {
        //                             type: 'value'
        //                         },
        //                         series: [{
        //                             data: data.data.vList,
        //                             type: 'bar',
        //                             showBackground: true,
        //                             backgroundStyle: {
        //                                 color: 'rgba(180, 180, 180, 0.2)'
        //                             },
        //                             itemStyle: {
        //                                 color: function (params) {
        //                                     if (params.name === that.info.cname) {
        //                                         return '#0fee8d';
        //                                     }
        //                                     return '#4ea397'
        //                                 }
        //                             }
        //                         }],
        //                         tooltip: {
        //                             trigger: 'axis',
        //                             axisPointer: {
        //                                 type: 'cross',
        //                                 label: {
        //                                     backgroundColor: '#6a7985'
        //                                 }
        //                             }
        //                         },
        //                     })
        //                 );
        //             }
        //         })
        //         .catch(function (err) {
        //             alert(err)
        //         });
        //     option && myChart.setOption(option);
        // }
    }

}
</script>

<style>
.infoAttr {
    text-align: left;
    margin-left: 10px;
}

.el-collapse-item__header {
    font-weight: bolder;
    background-color: #ffffff
}

.el-collapse-item__wrap {
    background-color: #ffffff
}

.el-collapse-item__content {
    font-family: "Times New Roman", SimSun, serif;

}

#echartsBox {
    /* background-color: rgba(0, 128, 0, 0.448); */
    width: 1050px;
    height: 630px
}

.el-button:hover {
    border-color: #088d53c8;
    background: #0fee8d05;
    color: #ffffff;
    font-weight: bold
}

.el-button:focus {
    border-color: #088d53c8;
    background: #0fee8d05;
    color: #000000;
    font-weight: bold
}

#displayButton {
    background: #0fee8d;
    border-color: #0fee8d;
    color: rgb(0, 0, 0);
}
</style>
