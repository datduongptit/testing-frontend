import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { reportConfig } from './reportConfig';
import ReportTable from './ReportTable';
import { useSelector } from 'react-redux';
import ProjectService from 'services/project.service';
import { setCurrentProject } from 'store/reducers/projects';
import { dispatch } from 'store/index';
import { useLocation } from 'react-router';
import BackButton from 'components/BackButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  project: PropTypes.object
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const ListReport = () => {
  const { pathname } = useLocation();
  const projectId = pathname.split('/')[2];
  const { currentProject: project } = useSelector((state) => state.projects);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProjectById = async () => {
    try {
      const res = await ProjectService.getProjectById(projectId);
      if (res) {
        const projectResult = res.data.result;
        let usersAssigned = projectResult?.usersAssigned;
        usersAssigned = typeof usersAssigned === 'string' ? JSON.parse(usersAssigned) : usersAssigned;
        projectResult.usersAssigned = usersAssigned;
        dispatch(setCurrentProject({ data: projectResult }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectById();
  }, [projectId]);

  return (
    project && (
      <div className="project-list-report">
        <div>
          <BackButton />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Typography variant="h5">List report</Typography>
        </div>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {reportConfig.map((item, index) => (
              <Tab key={index} label={item.title} {...a11yProps(index)} />
            ))}
          </Tabs>
          {reportConfig.map((item, index) => (
            <TabPanel key={index} value={value} index={index}>
              <ReportTable project={project} type={item.type} index={index} />
            </TabPanel>
          ))}
        </Box>
      </div>
    )
  );
};

export default ListReport;
