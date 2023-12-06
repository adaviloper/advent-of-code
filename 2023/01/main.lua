local data = require('data')

local function problem1()
  local sum = 0
  for _, v in pairs(data) do
    v = v:gsub('[a-zA-Z]', '')
    local new_number = v:sub(1, 1) .. v:sub(#v)
    if new_number == '' then
      new_number = '0'
    end
    sum = sum + tonumber(new_number)
  end
  return sum
end

local function problem2()
  local sum = 0
  for _, v in pairs(data) do
    local temp_string = ''
    local pos = 1
    for i = 1, #v do
      if i < pos then
        goto continue
      end
      local letter = v:sub(i, i)
      if letter == 'o' and v:sub(i, i + 2) == 'one' then
        temp_string = temp_string .. '1'
        pos = pos + 1
      elseif letter == 't' and v:sub(i, i + 2) == 'two' then
        temp_string = temp_string .. '2'
        pos = pos + 1
      elseif letter == 't' and v:sub(i, i + 4) == 'three' then
        temp_string = temp_string .. '3'
        pos = pos + 3
      elseif letter == 'f' and v:sub(i, i + 3) == 'four' then
        temp_string = temp_string .. '4'
        pos = pos + 2
      elseif letter == 'f' and v:sub(i, i + 3) == 'five' then
        temp_string = temp_string .. '5'
        pos = pos + 2
      elseif letter == 's' and v:sub(i, i + 2) == 'six' then
        temp_string = temp_string .. '6'
        pos = pos + 1
      elseif letter == 's' and v:sub(i, i + 4) == 'seven' then
        temp_string = temp_string .. '7'
        pos = pos + 3
      elseif letter == 'e' and v:sub(i, i + 4) == 'eight' then
        temp_string = temp_string .. '8'
        pos = pos + 3
      elseif letter == 'n' and v:sub(i, i + 3) == 'nine' then
        temp_string = temp_string .. '9'
        pos = pos + 2
      else
        temp_string = temp_string .. v:sub(i, i)
      end
      pos = pos + 1
      ::continue::
    end
    temp_string = temp_string:gsub('[a-zA-Z]', '')
    local new_number = temp_string:sub(1, 1) .. temp_string:sub(#temp_string)
    if new_number == '' then
      new_number = '0'
    end
    sum = sum + tonumber(new_number)
  end
  return sum
end

print(problem1())
print(problem2())
