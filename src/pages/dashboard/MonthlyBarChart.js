/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = ({ projects }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78]
    }
  ]);

  if (projects && projects.length > 0) {
    projects.forEach((project) => {
      const files = project.files?.filter((file) => file.fileType === 'TEST_CASE');
      // Tạo biến để lưu tổng số totalBug cho dự án hiện tại
      let totalBugCount = 0;

      // Lặp qua từng file và tính tổng số totalBug
      files.forEach((file) => {
        if (file.functions) {
          const functions = JSON.parse(file.functions);
          if (Array.isArray(functions)) {
            functions.forEach((func) => {
              console.log(123, func);
              totalBugCount += func.totalBug || 0;
            });
          }
        }
      });

      console.log(`Tổng số totalBug cho dự án ${project.name}: ${totalBugCount}`);
    });
  } else {
    console.log('Không có dữ liệu dự án.');
  }

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyBarChart;
