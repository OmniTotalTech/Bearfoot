import React, {Component} from 'react'
import ReactTable from "react-table";
import api from "../utils/api";
import moment from "moment";
import {ScrollView} from "react-native";

import Modal from "react-modal";
import EmployeeList from "../Components/Admin/ManagerList";


class AdvancedUserManagement extends Component {

    state = {disabledUsers: [], selectedOption: 0, tableData: [], isModalOpen: false,organizationList:[], userOrgs: [], userId: "",msg:""}

     columns = [
        {
            Header: "Name",
            accessor: "name",
            style: {
                //textAlign: "right",
            },

            // width: 100,
        },
        {
            Header: "Last Updated",
            accessor: "lastUpdated",
            style: {
                //textAlign: "right",
            },
            Cell: (porps) => {
                console.log(porps)
                return (<>  {moment(porps.original.lastUpdated.toString()).format('lll')} </>)
            }
            // width: 100,
        },
        {
            Header: "Last Updated By",
            accessor: "lastUpdatedBy.name",
            style: {
                //textAlign: "right",
            },

            // width: 100,
        },

        {
            Header: "Actions",
            filterable: false,
            sortable: false,
            resizable: false,
            width: 100,
            maxWidth: 100,
            minWidth: 100,
            Cell: (porps) => {
                console.log()
                return (
                    <>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => this.restoreAccess(porps.original._id,this.props)}>
                            Restore
                        </button>
                    </>
                )
            }
        },
    ];

    columns1 = [
        {
            Header: "Name",
            accessor: "name",
            style: {
                //textAlign: "right",
            },

            // width: 100,
        },
        {
            Header: "Actions",
            filterable: false,
            sortable: false,

            Cell: (porps) => {
                console.log()
                return (
                    <>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => {
                            this.loadAllOrgs(porps.original.organizations);
                            this.setState({userId: porps.original._id})
                        }}>
                            Add To Org
                        </button>
                    </>
                )
            }
        },
        {
            Header: "Organizations",
            accessor: "organizations",
            filterable: false,
            width: 300,
            maxWidth: 600,
            minWidth: 100,
            Cell:( (porps) =>
                 (
                    <>
                        {porps.original.organizations?.map((item) => <p>{item.orgName}</p>)}
                        {/*<button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => this.restoreAccess(porps.original._id,this.props)}>*/}
                        {/*    Restore*/}
                        {/*</button>*/}
                    </>
                )
            )
        },
        {
            Header: "Last Updated",
            accessor: "lastUpdated",
            style: {
                //textAlign: "right",
            },
            Cell: (porps) => {
                return (<>  {moment(porps.original.lastUpdated.toString()).format('lll')} </>)
            }
            // width: 100,
        },
        {
            Header: "Last Updated By",
            accessor: "lastUpdatedBy.name",
            style: {
                //textAlign: "right",
            },

            // width: 100,
        },



    ];

    async restoreAccess(_id, props) {

        await api.put(`/advancedUsers/${_id}`)
            .then((response) => {
                props.navigation.navigate("SuccessScreen");

                console.log(response.data)
            })
            .catch((err) => console.log(err))

        return undefined;
    }
    async dataReturn(value){

        console.log(Number.parseFloat(value))
        this.setState({selectedOption: Number.parseFloat(value)})
        switch (Number.parseFloat(value)) {
            case 0:
                return []
            case 1:
                let users = []
                console.log("logging disabled users")
                await api.get(`/advancedUsers`)
                    .then((response) => {
                        users = response.data.message
                        console.log(response.data)
                    })
                    .catch((err) => console.log(err))

                console.log(users)
                this.setState({tableData: users})
                return users
            case 2:
                users = []
                console.log("logging disabled users")
                await api.get(`/advancedUsers/all`)
                    .then((response) => {
                        users = response.data.message
                        console.log(response.data)
                    })
                    .catch((err) => console.log(err))

                console.log(users)
                this.setState({tableData: users})
                return users
            default:
                return;

        }
        this.forceUpdate()
    }
    closeModal() {
        this.setState({ isModalOpen: false, msg: "" });
        console.log(this.props);
        this.dataReturn(this.state.selectedOption)
    }

    async loadAllOrgs(orgs){
        this.setState({isModalOpen: true})
        await api
            .get(`/organizationManagement`)
            .then((response) => {
                console.log(response.data);
                this.setState({ organizationList: response.data});
                this.setState({userOrgs: orgs})
            })
            .catch((error) => {
                const errorMsg = error.message;
            });
    }

    async handleOrgUpdate(aos, orgName) {

        let s = this.state.userOrgs

        console.log(s)

        if(aos == "add"){
            console.log(orgName)
            if(s == null | undefined){
                s = []
            }
            s.push({orgName: orgName})

        }

        if(aos == "sub"){
            var index = s.findIndex(p => p.orgName == orgName);

            console.log(index)

            s.splice(index,1)
        }

        console.log(s);

        this.setState({userOrgs: s})


    }

    handleColumns() {

        if(this.state.selectedOption == 1){
            return this.columns
        }

        if(this.state.selectedOption == 2){
            return this.columns1
        }
        return [];
    }

    async handleSubmit(userOrgs,e){
        this.setState({msg: "Sending..."})
        e.preventDefault()
        await api
            .put(`/advancedUsers/${this.state.userId}/update`, {organizations: userOrgs})
            .then((response) => {
                console.log(response.data);
                this.setState({msg: "User has been saved and updated."})
            })
            .catch((error) => {
                const errorMsg = error.message;
                this.setState({msg: "Could not update user!"})

            });

    }

    render(){



        return (
        <>
            <ScrollView>
            <div className="container p-4">
                <h3 className="text-xl">Select an aspect to manage:</h3>

                <select defaultValue={0} onChange={e => this.dataReturn(e.target.value) }>
                    <option value={0} disabled>Choose an Option</option>
                    <option value={1}>
                        Disabled Users
                    </option>
                    <option value={2}>Organization Assignment</option>
                </select>


                {this.state.selectedOption == "1" ? (
                    <>
                    <ReactTable
                    className="-striped -highlight"
                    data={this.state.tableData}
                    filterable
                    columns={this.columns}
                    defaultPageSize={50}
                >
                    {(state, makeTable, instance) => {
                        this.reactTable = state.pageRows.map((modem) => {
                            return modem._original;
                        });
                        return <div>{makeTable()}</div>;
                    }}
                </ReactTable>
                    </>):(<></>)}


                {this.state.selectedOption == 2 ? (<ReactTable
                    className="-striped -highlight"
                    data={this.state.tableData}
                    filterable
                    columns={this.columns1}
                    defaultPageSize={50}
                >
                    {(state, makeTable, instance) => {
                        this.reactTable = state.pageRows.map((modem) => {
                            return modem._original;
                        });
                        return <div>{makeTable()}</div>;
                    }}
                </ReactTable>):(<></>)}

            </div>

                <Modal
                    {...this.props}
                    isOpen={this.state.isModalOpen}
                    style={{ width: "100%" }}
                >
                    <button
                        className="text bg-gray-600 p-2 rounded text-white"
                        onClick={() => {
                            this.closeModal();
                        }}
                    >
                        close
                    </button>

                    <h1 className="text-xl">Click an Organization's button to toggle that user's access to them.</h1>
                    <div>{this.state.organizationList?.map((org,i) => {
                     return (


                        <>

                            {this.state.userOrgs?.some(function (o) {
                                return o["orgName"] === org.orgName
                            }) ? (
                                <button onClick={() => this.handleOrgUpdate("sub", org.orgName)} className="bg-red-500 px-4 py-2 text-white rounded my-2 mx-2">
                                    {org.orgName}
                                </button>
                            ):(
                                <button onClick={() => this.handleOrgUpdate("add", org.orgName)} className="bg-gray-500 px-4 py-2 text-white rounded my-2 mx-2">
                                    {org.orgName}
                                </button>
                            ) }



                        </>
                     )
                    })}</div>
                    {this.state.msg}
                    <div>
                        <button onClick={(e) => this.handleSubmit(this.state.userOrgs,e)} className={"px-4 py-2 btn btn-danger bg-red-500 text-white rounded"}>Save</button>

                    </div>
                </Modal>
            </ScrollView>
        </>
    )
}

}


export default AdvancedUserManagement;