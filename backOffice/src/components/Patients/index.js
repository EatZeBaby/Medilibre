/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import './patients.scss';

const Patients = ({
  users,
  addUser,
  deleteUser,
  updateUser,
  tableState,
  setTableState,
  loading,
}) => {
  useEffect(() => {
    const newTableState = {
      columns: [
        { title: 'Nom', field: 'lastname' },
        { title: 'Prénom', field: 'firstname' },
        { title: 'N° de téléphone', field: 'phone' },
        { title: 'email', field: 'email', editable: 'never' },
      ],
      data: users,
    };
    setTableState(newTableState);
  }, [users]);


  return (
    <div className="patients">

      <div className="patients-content">
        {!loading && (

          <MaterialTable
            title={`${users.length} Comptes utilisateur`}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 50],
              actionsColumnIndex: -1,
            }}
            columns={tableState.columns}
            data={tableState.data}
            editable={{
              // eslint-disable-next-line no-unused-vars
              onRowAdd: (newData) => new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    addUser(newData);
                  }
                  resolve();
                }, 1000);
              }),
              // eslint-disable-next-line no-unused-vars
              onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    updateUser(newData);
                  }
                  resolve();
                }, 1000);
              }),
              // eslint-disable-next-line no-unused-vars
              onRowDelete: (oldData) => new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    // eslint-disable-next-line no-underscore-dangle
                    deleteUser(oldData._id);
                  }
                  resolve();
                }, 1000);
              }),
            }}
          />
        )}
      </div>
    </div>
  );
};

Patients.propTypes = {
  users: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  tableState: PropTypes.object.isRequired,
  setTableState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Patients;
