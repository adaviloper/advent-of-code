local M = {}
function M.dump(o, indent)
   indent = indent or ''
   if type(o) == 'table' then
      local s = '{\n'
      for k,v in pairs(o) do
         if type(k) ~= 'number' then k = k end
         s = s .. indent .. '  ["'..k..'"] = ' .. M.dump(v, indent..'  ') .. ',\n'
      end
      s = s .. indent .. '}'
      return s
   else
      if type(o) == 'number' then
         return o
      elseif type(o) == 'boolean' then
         if o == true then
            return 'true'
         else
            return 'false'
         end
      else
         return '"'..tostring(o)..'"'
      end
   end
end

function M.keyBy(input, keyName)
   keyName = keyName or nil
   local t = {}
   for k = 1, #input do
      if keyName == nil then
         if t[input[k]] ~= nil then
            print('', 'duplicate number', t[input[k]])
         end
         t[input[k]] = input[k]
      else
         table.insert(t, input[keyName], k)
      end
   end
   return t
end

function M.split(input, separator)
  local t = {}
  for str in string.gmatch(input, '[^' .. separator .. ']+') do
    table.insert(t, str)
  end
  return t
end
local t = {
   ["1"] = {

      ["1"] = "4",
      ["2"] = "6",
      ["3"] = "7",
      ["4"] = " ",
      ["5"] = " ",
      ["6"] = "1",
      ["7"] = "1",
      ["8"] = "4",
      ["9"] = " ",
      ["10"] = " ",
   },
   ["2"] = {

      ["1"] = " ",
      ["2"] = " ",
      ["3"] = " ",
      ["4"] = "*",
      ["5"] = " ",
      ["6"] = " ",
      ["7"] = " ",
      ["8"] = " ",
      ["9"] = " ",
      ["10"] = " ",
   },
   ["3"] = {

      ["1"] = " ",
      ["2"] = " ",
      ["3"] = "3",
      ["4"] = "5",
      ["5"] = " ",
      ["6"] = " ",
      ["7"] = "6",
      ["8"] = "3",
      ["9"] = "3",
      ["10"] = " ",
   },
}

return M
