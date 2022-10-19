// 导出excel数据
export function handleDownload(jsonData, columns, fileName) {
  if (jsonData.length > 0) {
    import('@/assets/js/Export2Excel').then(excel => {
      columns = columns // 表头
      const data = formatJson(jsonData)
      excel.export_json_to_excel({
        header: columns,
        data,
        autoWidth: 20,
        filename: fileName || '新建Excel文件' // 文件名称
      })
    })
  }
}

// 过滤需要的数据
function formatJson(jsonData) {
  const keys = Object.keys(jsonData[0])
  return jsonData.map(v => keys.map(j => {
    return v[j]
  }))
}
