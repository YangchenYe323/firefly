# Admin Interface

## Overview

The admin interface provides a comprehensive content management system for 蝶蝶Hikari's song collection. It features an authenticated, table-based interface for managing songs with real-time editing capabilities, filtering, and bulk operations.

## Admin Architecture

### 1. Access Control

#### Authentication Flow
```
User Login → JWT Verification → Admin Access → Protected Routes
```

#### Route Protection (`src/middleware.ts`)
```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("currentUser")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
```

### 2. Admin Page Structure

```
admin/
├── page.tsx                    # Main admin page
└── components/
    ├── EditableSongTable.tsx   # Main table component
    ├── AddHeaderCell.tsx       # Add new song functionality
    ├── EditableTextCell.tsx    # Text field editing
    ├── EditableListCell.tsx    # Array field editing (tags, languages)
    ├── EditCell.tsx            # Edit mode management
    └── Filter.tsx              # Table filtering
```

## Core Components

### 1. Admin Page (`src/app/admin/page.tsx`)

**Purpose:** Main admin interface entry point.

```typescript
export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <EditableSongTable />
    </div>
  );
}
```

**Features:**
- Container layout with proper spacing
- Full-width table interface
- Responsive design

### 2. EditableSongTable (`src/app/admin/components/EditableSongTable.tsx`)

**Purpose:** Main table component with full CRUD operations.

**Key Features:**
- Real-time song editing
- Add new songs
- Delete songs
- Bulk operations
- Search and filtering
- Pagination

**State Management:**
```typescript
const [songs, setSongs] = useState<Song[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
const [isAdding, setIsAdding] = useState(false);
const [filter, setFilter] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

**Data Operations:**
```typescript
// Load songs
const loadSongs = async () => {
  setIsLoading(true);
  try {
    const { songs } = await readSongAllNoCache();
    setSongs(songs);
  } catch (error) {
    console.error("Failed to load songs:", error);
  } finally {
    setIsLoading(false);
  }
};

// Create song
const handleCreate = async (songData: EditableSong) => {
  const result = await createSong(songData);
  if (result.success) {
    await loadSongs();
    setIsAdding(false);
  } else {
    // Handle error
  }
};

// Update song
const handleUpdate = async (songData: EditableSong) => {
  const result = await updateSong(songData);
  if (result.success) {
    await loadSongs();
    setEditingId(null);
  } else {
    // Handle error
  }
};

// Delete song
const handleDelete = async (id: number) => {
  if (confirm("确定要删除这首歌吗？")) {
    const result = await deleteSong(id);
    if (result.success) {
      await loadSongs();
    }
  }
};
```

### 3. AddHeaderCell (`src/app/admin/components/AddHeaderCell.tsx`)

**Purpose:** Add new song functionality with form validation.

**Features:**
- Inline form for new song entry
- Real-time validation
- Bilibili URL integration
- Audio file URL management

**Form Structure:**
```typescript
interface AddSongForm {
  title: string;
  artist: string;
  lang: string[];
  tag: string[];
  url: string;
  remark: string;
  bucket_url: string;
}
```

**Validation Logic:**
```typescript
const validateForm = () => {
  if (!form.title.trim()) {
    setError("歌曲名不能为空");
    return false;
  }
  
  if (!form.artist.trim()) {
    setError("歌手名不能为空");
    return false;
  }
  
  if (form.url && !isValidHttpUrl(form.url)) {
    setError("URL格式不正确");
    return false;
  }
  
  return true;
};
```

### 4. EditableTextCell (`src/app/admin/components/EditableTextCell.tsx`)

**Purpose:** Inline text editing for song fields.

**Features:**
- Click to edit functionality
- Auto-save on blur
- Validation feedback
- Keyboard shortcuts (Enter to save, Escape to cancel)

**Implementation:**
```typescript
const EditableTextCell = ({ 
  value, 
  onSave, 
  field, 
  isEditing 
}: EditableTextCellProps) => {
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue !== value) {
      setIsSaving(true);
      await onSave(field, editValue);
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
    }
  };

  return (
    <div className="relative">
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 border rounded"
          autoFocus
        />
      ) : (
        <span className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
          {value}
        </span>
      )}
      {isSaving && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
    </div>
  );
};
```

### 5. EditableListCell (`src/app/admin/components/EditableListCell.tsx`)

**Purpose:** Array field editing for tags and languages.

**Features:**
- Tag-based input interface
- Add/remove tags dynamically
- Validation for duplicate tags
- Keyboard navigation

**Implementation:**
```typescript
const EditableListCell = ({ 
  values, 
  onSave, 
  field, 
  isEditing 
}: EditableListCellProps) => {
  const [editValues, setEditValues] = useState(values);
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !editValues.includes(trimmedTag)) {
      setEditValues([...editValues, trimmedTag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditValues(editValues.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue) {
      setEditValues(editValues.slice(0, -1));
    }
  };

  return (
    <div className="space-y-2">
      {isEditing ? (
        <>
          <div className="flex flex-wrap gap-1">
            {editValues.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="添加标签..."
            className="w-full px-2 py-1 border rounded text-sm"
          />
        </>
      ) : (
        <div className="flex flex-wrap gap-1">
          {values.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 6. EditCell (`src/app/admin/components/EditCell.tsx`)

**Purpose:** Edit mode management and action buttons.

**Features:**
- Edit/Save/Cancel buttons
- Delete confirmation
- Loading states
- Visual feedback

**Implementation:**
```typescript
const EditCell = ({ 
  song, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}: EditCellProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("确定要删除这首歌吗？")) {
      setIsDeleting(true);
      await onDelete(song.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            保存
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            取消
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            编辑
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? "删除中..." : "删除"}
          </button>
        </>
      )}
    </div>
  );
};
```

### 7. Filter Component (`src/app/admin/components/Filter.tsx`)

**Purpose:** Table filtering and search functionality.

**Features:**
- Real-time search
- Column-specific filtering
- Clear filters option

**Implementation:**
```typescript
const Filter = ({ onFilter }: FilterProps) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={filterValue}
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="搜索歌曲..."
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
```

## Data Management

### 1. Song Data Structure

```typescript
interface EditableSong {
  id?: number;
  title: string;
  artist: string;
  lang: string[];
  tag: string[];
  url: string | null;
  remark: string;
  bucket_url?: string;
}
```

### 2. CRUD Operations

**Create:**
```typescript
const createSong = async (song: EditableSong) => {
  const result = await createSongAction(song);
  if (result.success) {
    toast.success("歌曲创建成功");
    await loadSongs();
  } else {
    toast.error(result.message || "创建失败");
  }
};
```

**Read:**
```typescript
const loadSongs = async () => {
  setIsLoading(true);
  try {
    const { songs } = await readSongAllNoCache();
    setSongs(songs);
  } catch (error) {
    toast.error("加载歌曲失败");
  } finally {
    setIsLoading(false);
  }
};
```

**Update:**
```typescript
const updateSong = async (song: EditableSong) => {
  const result = await updateSongAction(song);
  if (result.success) {
    toast.success("歌曲更新成功");
    await loadSongs();
  } else {
    toast.error(result.message || "更新失败");
  }
};
```

**Delete:**
```typescript
const deleteSong = async (id: number) => {
  const result = await deleteSongAction(id);
  if (result.success) {
    toast.success("歌曲删除成功");
    await loadSongs();
  } else {
    toast.error(result.message || "删除失败");
  }
};
```

## User Experience Features

### 1. Real-time Feedback

**Loading States:**
```typescript
{isLoading && (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
  </div>
)}
```

**Toast Notifications:**
```typescript
import { toast } from "react-toastify";

// Success notification
toast.success("操作成功");

// Error notification
toast.error("操作失败");
```

### 2. Keyboard Shortcuts

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && editingId !== null) {
      setEditingId(null);
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [editingId]);
```

### 3. Responsive Design

```typescript
// Mobile-friendly table
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    {/* Table content */}
  </table>
</div>
```

## Security Features

### 1. Authentication Verification

```typescript
// Server-side authentication check
const auth = async () => {
  const currentUser = cookies().get("currentUser")?.value;
  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));
  return jwtVerified;
};
```

### 2. Input Validation

```typescript
const validateSong = (song: EditableSong) => {
  if (!song.title.trim()) {
    return { success: false, message: "歌曲名不能为空" };
  }
  
  if (!song.artist.trim()) {
    return { success: false, message: "歌手名不能为空" };
  }
  
  if (song.url && !isValidHttpUrl(song.url)) {
    return { success: false, message: "URL格式不正确" };
  }
  
  return { success: true };
};
```

### 3. CSRF Protection

```typescript
// JWT tokens with proper expiration
const token = await new SignJWT({ username })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("24h")
  .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY));
```

## Performance Optimizations

### 1. Optimistic Updates

```typescript
const handleUpdate = async (songData: EditableSong) => {
  // Optimistic update
  setSongs(prev => prev.map(song => 
    song.id === songData.id ? { ...song, ...songData } : song
  ));
  
  // Server update
  const result = await updateSongAction(songData);
  if (!result.success) {
    // Revert on failure
    await loadSongs();
    toast.error(result.message || "更新失败");
  }
};
```

### 2. Debounced Search

```typescript
const debouncedFilter = useMemo(
  () => debounce((value: string) => {
    setFilter(value);
  }, 300),
  []
);
```

### 3. Virtual Scrolling (Future Enhancement)

```typescript
// For large datasets
import { FixedSizeList as List } from 'react-window';

const VirtualizedTable = ({ songs }: { songs: Song[] }) => {
  return (
    <List
      height={600}
      itemCount={songs.length}
      itemSize={50}
      itemData={songs}
    >
      {SongRow}
    </List>
  );
};
```

## Error Handling

### 1. Network Errors

```typescript
const handleApiCall = async (apiFunction: () => Promise<any>) => {
  try {
    return await apiFunction();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("网络连接失败，请检查网络设置");
    } else {
      toast.error("服务器错误，请稍后重试");
    }
    throw error;
  }
};
```

### 2. Validation Errors

```typescript
const handleValidation = (result: ValidationResult) => {
  if (!result.success) {
    toast.error(result.message);
    return false;
  }
  return true;
};
```

### 3. Graceful Degradation

```typescript
// Fallback for failed operations
const handleOperationFailure = (operation: string, error: any) => {
  console.error(`${operation} failed:`, error);
  toast.error(`${operation}失败，请稍后重试`);
  
  // Refresh data to ensure consistency
  loadSongs();
};
```

## Testing Strategy

### 1. Component Testing

```typescript
describe("EditableSongTable", () => {
  it("should load and display songs", async () => {
    render(<EditableSongTable />);
    await waitFor(() => {
      expect(screen.getByText("歌曲名")).toBeInTheDocument();
    });
  });
  
  it("should handle edit mode correctly", () => {
    render(<EditableSongTable />);
    const editButton = screen.getByText("编辑");
    fireEvent.click(editButton);
    expect(screen.getByText("保存")).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

```typescript
describe("Admin CRUD Operations", () => {
  it("should create a new song", async () => {
    const songData = {
      title: "Test Song",
      artist: "Test Artist",
      lang: ["Chinese"],
      tag: ["Pop"],
      url: null,
      remark: "Test remark"
    };
    
    const result = await createSong(songData);
    expect(result.success).toBe(true);
  });
});
```

## Future Enhancements

### 1. Bulk Operations

```typescript
// Bulk delete
const handleBulkDelete = async (selectedIds: number[]) => {
  if (confirm(`确定要删除选中的 ${selectedIds.length} 首歌吗？`)) {
    await Promise.all(selectedIds.map(id => deleteSong(id)));
    await loadSongs();
  }
};
```

### 2. Import/Export

```typescript
// CSV export
const exportSongs = () => {
  const csv = songs.map(song => 
    `${song.title},${song.artist},${song.lang.join(';')},${song.tag.join(';')}`
  ).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'songs.csv';
  a.click();
};
```

### 3. Advanced Filtering

```typescript
// Multi-column filtering
const advancedFilter = {
  title: "",
  artist: "",
  tags: [] as string[],
  languages: [] as string[],
  dateRange: {
    start: null as Date | null,
    end: null as Date | null
  }
};
``` 