local data = require('03.data')

local checkedCoordinates = {}
local partNumbers = {}

local function prepend(grid, row, col)
  local s = ''
  local line = grid[row]
  for i = 1, #line do
    local target = line[col + 1 - i]
    checkedCoordinates[row..'-'..(col + 1 - i)] = true
    if target:find("%d") == nil then goto continue end
    s = target..s
    -- need to record which coordinates have already been checked
    if col + 1 - i <= 1 then goto continue end
  end
  ::continue::
  return s
end

local function append(grid, row, col)
  local s = ''
  local line = grid[row]
  for i = 1, #line do
    local target = line[col + i]
    if target:find("%d") == nil then goto continue end
    s = s..target
    checkedCoordinates[row..'-'..(col + i)] = true
    if col + i == #line then goto continue end
  end
  ::continue::
  return s
end

local function checkNW(grid, i, j)
  if i > 1 and j > 1 and checkedCoordinates[(i-1)..'-'..(j-1)] ~= nil then
    return false
  end
  local target = grid[i - 1][j - 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkN(grid, i, j)
  if i > 1 and checkedCoordinates[(i-1)..'-'..j] ~= nil then
    return false
  end
  local target = grid[i - 1][j]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkNE(grid, i, j)
  if i > 1 and j < #grid[i - 1] and checkedCoordinates[(i-1)..'-'..j] ~= nil then
    return false
  end
  local target = grid[i - 1][j + 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkE(grid, i, j)
  if j < #grid[i] and checkedCoordinates[(i)..'-'..(j + 1)] ~= nil then
    return false
  end
  local target = grid[i][j + 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkSW(grid, i, j)
  if i < #grid and j < #grid[i + 1] and checkedCoordinates[(i+1)..'-'..(j-1)] ~= nil then
    return false
  end
  local target = grid[i + 1][j - 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkS(grid, i, j)
  if i < #grid and checkedCoordinates[(i+1)..'-'..(j)] ~= nil then
    return false
  end
  local target = grid[i + 1][j]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkSE(grid, i, j)
  if i < #grid and j < #grid[i + 1] and checkedCoordinates[(i+1)..'-'..(j+1)] ~= nil then
    return false
  end
  local target = grid[i + 1][j + 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function checkW(grid, i, j)
  if j < #grid[i] and checkedCoordinates[(i)..'-'..(j-1)] ~= nil then
    return false
  end
  local target = grid[i][j - 1]
  return target ~= ' ' and target:find("%d") ~= nil
end

local function problem1()
  local grid = {}
  for i, l in pairs(data) do
    table.insert(grid, i, {})
    l = l:gsub('%.', ' ')
    for j = 1, #l do
      table.insert(grid[i], j, l:sub(j, j))
    end
  end
  local sum = 0
  local partNumber = ''
  for i, row in pairs(grid) do
    for j, char in pairs(row) do
      local target = grid[i][j]
      if target:find("%D") ~= nil and target ~= ' ' then
        if checkNW(grid, i, j) then
          partNumber = prepend(grid, i - 1, j - 1)..append(grid, i - 1, j - 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkN(grid, i, j) then
          partNumber = prepend(grid, i - 1, j)..append(grid, i - 1, j)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkNE(grid, i, j) then
          partNumber = prepend(grid, i - 1, j + 1)..append(grid, i - 1, j + 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkE(grid, i, j) then
          partNumber = prepend(grid, i, j + 1)..append(grid, i, j + 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkSW(grid, i, j) then
          partNumber = prepend(grid, i + 1, j - 1)..append(grid, i + 1, j - 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkS(grid, i, j) then
          partNumber = prepend(grid, i + 1, j)..append(grid, i + 1, j)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkSE(grid, i, j) then
          partNumber = prepend(grid, i + 1, j + 1)..append(grid, i + 1, j + 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
        if checkW(grid, i, j) then
          partNumber = prepend(grid, i, j - 1)..append(grid, i, j - 1)
          sum = sum + tonumber(partNumber)
          table.insert(partNumbers, partNumber)
        end
      end
    end
  end
  return sum
end

local function problem2()
  local grid = {}
  for i, l in pairs(data) do
    table.insert(grid, i, {})
    l = l:gsub('%.', ' ')
    for j = 1, #l do
      table.insert(grid[i], j, l:sub(j, j))
    end
  end
  local partNumber = ''
  local ratioSums = 0
  for i, row in pairs(grid) do
    for j in pairs(row) do
      local target = grid[i][j]
      local gearParts = {}
      if target:find("%D") ~= nil and target ~= ' ' then
        if checkNW(grid, i, j) then
          partNumber = prepend(grid, i - 1, j - 1)..append(grid, i - 1, j - 1)
          table.insert(gearParts, partNumber)
        end
        if checkN(grid, i, j) then
          partNumber = prepend(grid, i - 1, j)..append(grid, i - 1, j)
          table.insert(gearParts, partNumber)
        end
        if checkNE(grid, i, j) then
          partNumber = prepend(grid, i - 1, j + 1)..append(grid, i - 1, j + 1)
          table.insert(gearParts, partNumber)
        end
        if checkE(grid, i, j) then
          partNumber = prepend(grid, i, j + 1)..append(grid, i, j + 1)
          table.insert(gearParts, partNumber)
        end
        if checkSW(grid, i, j) then
          partNumber = prepend(grid, i + 1, j - 1)..append(grid, i + 1, j - 1)
          table.insert(gearParts, partNumber)
        end
        if checkS(grid, i, j) then
          partNumber = prepend(grid, i + 1, j)..append(grid, i + 1, j)
          table.insert(gearParts, partNumber)
        end
        if checkSE(grid, i, j) then
          partNumber = prepend(grid, i + 1, j + 1)..append(grid, i + 1, j + 1)
          table.insert(gearParts, partNumber)
        end
        if checkW(grid, i, j) then
          partNumber = prepend(grid, i, j - 1)..append(grid, i, j - 1)
          table.insert(gearParts, partNumber)
        end
        if #gearParts == 2 then
          ratioSums = ratioSums + (gearParts[1] * gearParts[2])
        end
      end
    end
  end
  return ratioSums
end

-- print(problem1())
print(problem2())

local t = { ["1"] = "35",["2"] = "633",["3"] = "617",["4"] = "592",["5"] = "664",["6"] = "598",}
