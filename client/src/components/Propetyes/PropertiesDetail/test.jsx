    <div className="container mx-auto p-4 space-y-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Quản lý tin đăng của bạn</h1>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="flex gap-2">
                  <Checkbox />
                  {/* <Input
                    placeholder="Tìm kiếm tin đăng"
                    className="flex-1"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {/* <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Loại BĐS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="house">Nhà ở</SelectItem>
                    <SelectItem value="apartment">Căn hộ</SelectItem>
                    <SelectItem value="land">Đất nền</SelectItem>
                  </SelectContent>
                </Select> */}

                {/* <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="active">Đang hiển thị</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="expired">Hết hạn</SelectItem>
                  </SelectContent>
                </Select> */}
    {/*
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Mới nhất</SelectItem>
                    <SelectItem value="-createdAt">Cũ nhất</SelectItem>
                    <SelectItem value="price">Giá tăng dần</SelectItem>
                    <SelectItem value="-price">Giá giảm dần</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">Đang tải...</div>
          ) : (
            <div className="space-y-4">
              {prototypes?.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="grid grid-cols-10 gap-4">
                    <div className="col-span-3 relative">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="col-span-7 p-4">
                      <h3 className="font-semibold truncate">{property.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{property.price} tỷ</span>
                          <span>{property.priceUnits} triệu/m²</span>
                          {/* <span>{property.area}m²</span> */}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 shrink-0 mt-1" />
                          <span>{property.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{property.createdAt}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
    <div>
      <ConditionRendering show={isLoading}>
        <div className="grid grid-cols-10 gap-3 mb-4">
          {properties?.rows?.map((property) => (
            <Card
              key={property.id}
              className={`${
                setLayout ? "col-span-5 " : "col-span-10"
              } overflow-hidden`}
            >
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-4 relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  {me.id && (
                    <>
                      <Badge
                        className={`absolute top-0 left-0 ${getStatusColor(
                          property.status
                        )} text-white border-none`}
                      >
                        {getStatusText(property.status)}
                      </Badge>
                      <Badge className="absolute bottom-2 right-2 bg-black/50 text-white border-none">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        {property.images.length}
                      </Badge>
                    </>
                  )}
                </div>
                <div className="col-span-6 p-4">
                  <span className="flex items-center w-full">
                    <h3 className="font-semibold truncate break-words flex-1">
                      {property.title}
                    </h3>
                    <ConditionRendering show={setLayout}>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical
                            size={14}
                            className={cn(resetOutline, "ml-2 cursor-pointer")}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" bg-slate-300 rounded-md">
                          <DropdownMenuItem className="text-main">
                            <Link
                              to={`${pathnames.public.Property_Detail}/${property.idPost}`}
                            >
                              Sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red"
                            onClick={() => {
                              handleRemove(property.idPost);
                            }}
                          >
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ConditionRendering>
                  </span>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {Number(property.price) === 0
                          ? "Liên hệ"
                          : Number(property.price).toLocaleString() + " đ"}
                      </span>
                      <span>{property.priceUnits}</span>
                      <span>{property.size}m²</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0 mt-1" />
                      <span className="break-words">{property.address}</span>
                    </div>
                    {/* thông tin chi tiết */}
                    {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {property.bedroom} PN
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowUpDown className="w-4 h-4" />
                    {property.floor} Tầng
                  </span>
                  <span>{property.direction}</span>
                </div> */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Ngày đăng:{" "}
                        {new Date(property.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ConditionRendering show={isLoading}>
          <PaginationComponent
            total={properties?.count}
            currentPage={properties?.page}
            limit={properties?.limit}
          />
        </ConditionRendering>
      </ConditionRendering>
      <ConditionRendering show={!isLoading}>
        <span className="w-full mx-auto">
          <Loader size={24} />
          <span>Loading...</span>
        </span>
      </ConditionRendering>
    </div>